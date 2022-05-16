let setApiHeaders = accountName => {
    let headers = [];
  if (accountName == "motorolasandbox") {
    headers = {
      "X-Requested-With": "XMLHttpRequest",
      "X-VTEX-API-AppKey": "vtexappkey-motorolasandbox-PRTIRG",
      "X-VTEX-API-AppToken":
        "TDXKWRQKSCVJDWKSQANSSLGUITNEDIGTZFKCYKAXBWLINBSPELYVSYXIWCBDDLHJVBJYMITFZPQVAYHHAXASKKBAIBFVIXUQPBNLRTCWRTWCIBIYVUCGLOZKAJQLCYWB"
    };
  } else {
    headers = {
      "X-Requested-With": "XMLHttpRequest",
      "X-VTEX-API-AppKey": "vtexappkey-motorolaus-THVFMP",
      "X-VTEX-API-AppToken":
        "CXKMMYAZWVYHCXIYTIKIDXBGSVSIRVEOBEQHGHAOQRRCCRDAUBUULSVFWETRGRHBQJGXHBRMHWSLGZDARSNQAKCIJLLCNJHYJPLTLFTTKIMPZJYXASZNDRAGGXOVQOYY"
    };
  }
  return headers;
};
export { setApiHeaders };