function loadJSON(filePath: string) {
  const json = loadTextFileAjaxSync(filePath, 'application/json');
  const Config = JSON.parse(json as string);

  return {
    tripBaseUrl: Config.Trip_BaseUri,
    environmentName: Config.environmentName,
  };
}

function loadTextFileAjaxSync(filePath: string, mimeType: string) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', filePath, false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status === 200) {
    return xmlhttp.responseText;
  } else {
    return null;
  }
}

export const environment = {
  ...loadJSON('/assets/environments-config/config.json'),
};
