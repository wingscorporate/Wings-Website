// Paste this entire file into Extensions > Apps Script > Code.gs in the target Sheet.
// Configure Script Properties and deploy as described in docs/careers-application-backend.md.
var CAREERS_SHEET_ID = '1l2dZKRKQuczOR9nh0vc1WMtTshbgBFp3zyZoRZz_FSE';
var CAREERS_ROLES = {
  'web-developer': ['Web Developer', 'IT'],
  'business-development-associate': ['Business Development Associate', 'Business Development'],
  'business-development-executive': ['Business Development Executive', 'Business Development'],
  'performance-marketer': ['Performance Marketer', 'Performance Marketing']
};
// First name is the default column title; others match common existing headers.
var CAREERS_COLUMNS = [
  ['Application Date & Time (IST)', 'timestamp', 'application date time', 'date', 'submitted at'],
  ['Candidate Full Name', 'full name', 'candidate name', 'name'],
  ['Email Address', 'email', 'email id'],
  ['Phone Number', 'phone', 'mobile', 'mobile number', 'contact number'],
  ['Position Applied For', 'position', 'job role', 'job title', 'applying for'],
  ['Department'], ['Experience', 'total work experience', 'work experience'],
  ['Current Location', 'location', 'city state', 'city and state'],
  ['Resume/CV Link', 'resume link', 'cv link', 'resume', 'resume url'],
  ['Portfolio Link', 'portfolio', 'portfolio url'],
  ['Additional Message', 'message', 'cover letter', 'notes'],
  ['Application Status', 'status'],
  ['Application ID'], ['Application Fingerprint'], ['Additional Application Details']
];

function careerJson_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
function careerNormalize_(text) { return String(text).toLowerCase().replace(/[^a-z0-9]/g, ''); }
function careerFindColumn_(headers, aliases) {
  var names = aliases.map(careerNormalize_);
  return headers.findIndex(function (header) { return names.indexOf(careerNormalize_(header)) >= 0; });
}
function careerHeaders_(sheet) {
  return sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0] : [];
}
function careerSheet_(book, props) {
  var configured = props.getProperty('CAREERS_SHEET_NAME');
  var sheet = configured ? book.getSheetByName(configured) : null;
  if (configured && !sheet) sheet = book.insertSheet(configured);
  if (!configured) {
    // Reuse an identifiable careers table; never guess that an unrelated data tab is careers.
    sheet = book.getSheets().find(function (candidate) {
      var headers = careerHeaders_(candidate);
      return careerFindColumn_(headers, CAREERS_COLUMNS[1]) >= 0 &&
        careerFindColumn_(headers, CAREERS_COLUMNS[2]) >= 0 &&
        careerFindColumn_(headers, CAREERS_COLUMNS[4]) >= 0;
    });
    if (!sheet) sheet = book.getSheetByName('Career Applications') || book.insertSheet('Career Applications');
  }
  var headers = careerHeaders_(sheet);
  if (sheet.getLastRow() > 0 && careerFindColumn_(headers, CAREERS_COLUMNS[1]) < 0 && careerFindColumn_(headers, CAREERS_COLUMNS[2]) < 0) {
    throw new Error('Selected tab does not contain recognizable headers. Use an empty careers tab.');
  }
  var missing = CAREERS_COLUMNS.filter(function (aliases) { return careerFindColumn_(headers, aliases) < 0; }).map(function (aliases) { return aliases[0]; });
  if (headers.length + missing.length > sheet.getMaxColumns()) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length + missing.length - sheet.getMaxColumns());
  }
  if (missing.length) sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
  return { sheet: sheet, headers: headers.concat(missing) };
}
function careerSafeCell_(value) {
  var text = String(value == null ? '' : value);
  // Treat all candidate input as text; do not execute spreadsheet formulas.
  return /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  var lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 8 * 1024 * 1024) return careerJson_({ success: false, code: 'INVALID_REQUEST' });
    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('CAREERS_SHARED_SECRET');
    if (!secret || secret.length < 32 || data.secret !== secret) return careerJson_({ success: false, code: 'UNAUTHORIZED' });
    if (data.spreadsheetId !== CAREERS_SHEET_ID || !CAREERS_ROLES[data.jobId]) return careerJson_({ success: false, code: 'INVALID_REQUEST' });
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(data.applicationId || '') || !/^[0-9a-f]{64}$/.test(data.fingerprint || '')) return careerJson_({ success: false, code: 'INVALID_REQUEST' });
    var fields = data.fields || {};
    var required = ['fullName', 'email', 'mobile', 'cityState', 'experience', 'noticePeriod', 'qualification', 'relevantSkills'];
    var roleFields = data.jobId === 'web-developer' ? ['webTechnologies', 'webPlatformExperience', 'webProjects'] : data.jobId.indexOf('business-development-') === 0 ? ['bdSalesExperience', 'bdLeadGen', 'bdTargets'] : ['metaAdsExperience', 'googleAdsExperience', 'trackingExperience', 'optimizationExperience'];
    if (required.concat(roleFields).some(function (key) { return typeof fields[key] !== 'string' || !fields[key].trim() || fields[key].length > 4000; }) || fields.consent !== true || !/^\S+@\S+\.\S+$/.test(fields.email) || !/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(fields.mobile.replace(/[()]/g, '')) || JSON.stringify(fields).length > 35000) {
      return careerJson_({ success: false, code: 'VALIDATION_FAILED' });
    }
    var resume = data.resume || {};
    var mimeTypes = {
      'resume.pdf': 'application/pdf',
      'resume.doc': 'application/msword',
      'resume.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    if (!mimeTypes[resume.name] || resume.type !== mimeTypes[resume.name] || typeof resume.base64 !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(resume.base64) || resume.base64.length % 4 !== 0 || resume.base64.length > 6990508) return careerJson_({ success: false, code: 'INVALID_RESUME' });
    var bytes = Utilities.base64Decode(resume.base64);
    if (!bytes.length || bytes.length > 5 * 1024 * 1024) return careerJson_({ success: false, code: 'INVALID_RESUME' });
    var signatures = { 'resume.pdf': [37, 80, 68, 70, 45], 'resume.doc': [208, 207, 17, 224, 161, 177, 26, 225], 'resume.docx': [80, 75, 3, 4] };
    if (signatures[resume.name].some(function (byte, index) { return (bytes[index] & 255) !== byte; })) return careerJson_({ success: false, code: 'INVALID_RESUME' });

    lock = LockService.getScriptLock();
    if (!lock.tryLock(30000)) return careerJson_({ success: false, code: 'BUSY' });
    var book = SpreadsheetApp.openById(CAREERS_SHEET_ID);
    var table = careerSheet_(book, props);
    var idColumn = careerFindColumn_(table.headers, CAREERS_COLUMNS[12]) + 1;
    var fingerprintColumn = careerFindColumn_(table.headers, CAREERS_COLUMNS[13]) + 1;
    var previous = table.sheet.getLastRow() > 1 ? table.sheet.getRange(2, idColumn, table.sheet.getLastRow() - 1, 1).createTextFinder(data.applicationId).matchEntireCell(true).findNext() : null;
    if (previous) {
      if (table.sheet.getRange(previous.getRow(), fingerprintColumn).getValue() !== data.fingerprint) return careerJson_({ success: false, code: 'ID_CONFLICT' });
      return careerJson_({ success: true, saved: true, duplicate: true, applicationId: data.applicationId });
    }

    // Authenticated rate limit protects Apps Script/Drive quotas, even if multiple API instances run.
    var cache = CacheService.getScriptCache();
    var windowKey = 'career-count-' + Math.floor(Date.now() / 60000);
    var count = Number(cache.get(windowKey) || '0');
    if (count >= 60) return careerJson_({ success: false, code: 'RATE_LIMITED' });
    cache.put(windowKey, String(count + 1), 120);

    var folderId = props.getProperty('CAREERS_RESUME_FOLDER_ID');
    if (!folderId) throw new Error('Resume folder is not configured');
    var folder = DriveApp.getFolderById(folderId);
    if (folder.getSharingAccess() !== DriveApp.Access.PRIVATE) throw new Error('Resume folder must have restricted general access');
    var filename = data.applicationId + '-' + resume.name;
    var existingFiles = folder.getFilesByName(filename);
    var file = existingFiles.hasNext() ? existingFiles.next() : null;
    if (file && (file.getDescription() !== data.fingerprint || file.getSharingAccess() !== DriveApp.Access.PRIVATE)) return careerJson_({ success: false, code: 'ID_CONFLICT' });
    if (!file) {
      file = folder.createFile(Utilities.newBlob(bytes, resume.type, filename));
      file.setDescription(data.fingerprint);
    }
    var canonical = [
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss') + ' IST',
      fields.fullName, fields.email, fields.mobile,
      CAREERS_ROLES[data.jobId][0], CAREERS_ROLES[data.jobId][1], fields.experience,
      fields.cityState, file.getUrl(), fields.portfolioUrl || '', fields.coverLetter || '',
      'New', data.applicationId, data.fingerprint, JSON.stringify(fields)
    ];
    var row = table.headers.map(function () { return ''; });
    CAREERS_COLUMNS.forEach(function (aliases, index) { row[careerFindColumn_(table.headers, aliases)] = careerSafeCell_(canonical[index]); });
    var nextRow = table.sheet.getLastRow() + 1;
    if (nextRow > table.sheet.getMaxRows()) table.sheet.insertRowsAfter(table.sheet.getMaxRows(), 1);
    table.sheet.getRange(nextRow, 1, 1, row.length).setNumberFormat('@').setValues([row]);
    SpreadsheetApp.flush();
    // Do not report success until the ID is read back from the newly written row.
    if (table.sheet.getRange(nextRow, idColumn).getValue() !== data.applicationId) throw new Error('Application read-back failed');
    return careerJson_({ success: true, saved: true, applicationId: data.applicationId });
  } catch (error) {
    // Retain an uploaded resume on ambiguous write failures; a retry reuses it by ID.
    // Never log candidate content or credentials.
    console.error('Career application persistence failed; check deployment permissions/configuration.');
    return careerJson_({ success: false, code: 'SAVE_FAILED' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

// Run manually once from the Apps Script editor to authorize Sheets and Drive.
// This function does not create, delete, or modify sheet rows.
function verifyCareerSetup() {
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('CAREERS_SHARED_SECRET');
  if (!secret || secret.length < 32) throw new Error('Set CAREERS_SHARED_SECRET to at least 32 random characters');
  var book = SpreadsheetApp.openById(CAREERS_SHEET_ID);
  var folder = DriveApp.getFolderById(props.getProperty('CAREERS_RESUME_FOLDER_ID'));
  if (folder.getSharingAccess() !== DriveApp.Access.PRIVATE) throw new Error('Set the resume folder general access to Restricted');
  console.log('Google access verified. Tabs: ' + book.getSheets().map(function (sheet) { return sheet.getName(); }).join(', '));
  console.log('Now deploy the web app and run the live application verification.');
}

// Editor-only verification/cleanup; never exposed by doPost.
function careerTestRecords_() {
  var props = PropertiesService.getScriptProperties();
  var ids = (props.getProperty('CAREERS_TEST_APPLICATION_IDS') || '').split(',').map(function (id) { return id.trim(); }).filter(Boolean);
  if (ids.length !== 4 || new Set(ids).size !== 4 || ids.some(function (id) { return !/^[0-9a-f-]{36}$/.test(id); })) throw new Error('Set CAREERS_TEST_APPLICATION_IDS to the four exact IDs from the live verification runner');
  var records = [];
  SpreadsheetApp.openById(CAREERS_SHEET_ID).getSheets().forEach(function (sheet) {
    var headers = careerHeaders_(sheet);
    var columns = CAREERS_COLUMNS.map(function (aliases) { return careerFindColumn_(headers, aliases); });
    if (columns.some(function (column) { return column < 0; }) || sheet.getLastRow() < 2) return;
    sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getDisplayValues().forEach(function (row, index) {
      var id = row[columns[12]];
      if (ids.indexOf(id) < 0) return;
      if (row[columns[1]].indexOf('INTEGRATION TEST - ') !== 0 || row[columns[2]] !== 'integration-test+' + id + '@example.com') throw new Error('Refusing to operate on a record that is not explicitly a synthetic test');
      var files = DriveApp.getFolderById(props.getProperty('CAREERS_RESUME_FOLDER_ID')).getFilesByName(id + '-resume.pdf');
      if (!files.hasNext()) throw new Error('Test resume not found');
      var file = files.next();
      if (file.getUrl() !== row[columns[8]] || file.getDescription() !== row[columns[13]] || file.getSharingAccess() !== DriveApp.Access.PRIVATE) throw new Error('Resume link, fingerprint or permissions mismatch');
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} IST$/.test(row[columns[0]]) || row[columns[3]] !== '9000000000' || row[columns[11]] !== 'New') throw new Error('Test timestamp, contact details or status mismatch');
      records.push({ sheet: sheet, row: index + 2, id: id, role: row[columns[4]], file: file });
    });
  });
  if (records.length !== 4 || new Set(records.map(function (record) { return record.id; })).size !== 4 || new Set(records.map(function (record) { return record.role; })).size !== 4) throw new Error('Expected exactly one test row per application ID and four distinct roles');
  return records;
}

function verifyCareerTestApplications() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    careerTestRecords_().forEach(function (record) { console.log('Verified persisted test row and restricted resume: ' + record.id + ' / ' + record.role); });
    console.log('Sheet read-back passed. Open each resume link as an authorized HR user before cleanup.');
  } finally { lock.releaseLock(); }
}

function cleanupCareerTestApplications() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    // Validate ALL records before deleting any; descending rows avoid index shifts.
    careerTestRecords_().sort(function (a, b) { return b.row - a.row; }).forEach(function (record) {
      record.file.setTrashed(true);
      record.sheet.deleteRow(record.row);
      console.log('Removed synthetic test: ' + record.id);
    });
    PropertiesService.getScriptProperties().deleteProperty('CAREERS_TEST_APPLICATION_IDS');
  } finally { lock.releaseLock(); }
}
