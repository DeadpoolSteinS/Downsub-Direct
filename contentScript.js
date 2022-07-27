(() => {
  let urlVideo = "";

  const downsubDirect = async () => {
    window.open('https://subtitle.to/' + urlVideo, '_blank');
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

    if (!bookmarkBtnExists) {
      const directBtn = document.createElement("img");

      directBtn.src = chrome.runtime.getURL("bookmark.png");
      directBtn.className = "ytp-button " + "bookmark-btn";
      directBtn.title = "Click to Get Subtitle";

      const youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      youtubeLeftControls.appendChild(directBtn);

      directBtn.addEventListener("click", downsubDirect);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, tabUrl } = obj;
    
    if(type == "NEW"){
      urlVideo = tabUrl;
      newVideoLoaded();
    }
  });

})();