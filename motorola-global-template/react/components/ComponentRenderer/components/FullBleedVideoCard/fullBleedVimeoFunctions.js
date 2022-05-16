let getVimeoId = url => {
  /*
      http://vimeo.com/88888888
      http://player.vimeo.com/video/88888888
      http://player.vimeo.com/video/88888888?title=0&byline=0&portrait=0
      http://vimeo.com/channels/staffpicks/88888888
      https://vimeo.com/groups/name/videos/11111111
      https://vimeo.com/album/2222222/video/11111111
    */
  let result = url.match(
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i
  );
  if (result !== null && result.length) {
    return result[1];
  }
  return;
};

let buildURLQuery = obj => {
  return Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join("="))
    .join("&");
};

export { getVimeoId, buildURLQuery };
