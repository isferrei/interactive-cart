const dataEntity = 'marketing_pages',
  schemaName = 'marketing_pages_schema';
let cookieUrl = window.location ? `https://${window.location.hostname}/api/sessions?items=*` : null,
  route = window.location ? (window.location.href).split('https://' + window.location.hostname) : null;

export { dataEntity, schemaName, cookieUrl, route };
