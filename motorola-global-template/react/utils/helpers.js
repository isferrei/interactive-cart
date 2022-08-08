export const getRootPath = __RUNTIME__.rootPath ? __RUNTIME__.rootPath : "";
export const getAssetsUrl = "//" + __RUNTIME__.assetServerPublishedHost;
export const elementObserver = (element, callback) => {
  const observer = new MutationObserver(mutations => {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      for (let z = 0; z < mutation.addedNodes.length; z++) {
        const addedNode = mutation.addedNodes[z];
        if (addedNode) {
          if (addedNode.querySelector) {
            const foundElement = addedNode.querySelector(element);
            if (foundElement) {
              callback(foundElement);
              observer.disconnect();
            }
          }
        }
      }
    }
  });
  const observeOptions = {
    childList: true,
    subtree: true
  };
  observer.observe(element, observeOptions);
};
export const hasSmartphonesCategory = categories => {
  return categories.some(category =>
    category.toLowerCase().includes("smartphone")
  );
};
