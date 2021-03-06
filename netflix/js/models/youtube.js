window.Youtube = (() => {
  function Youtube() {
    this.config = {}
    this.config.key = 'AIzaSyCXDXrsBlReOJp_Z5mw9Q943-heSPlzV5M';
    this.config.api = 'https://www.googleapis.com/youtube/v3';
    this.channelId = '';
    this.activitiesUrl = () => `${this.config.api}/activities?part=snippet&channelId=${this.channelId}&key=${this.config.key}`;
    this.videosChannelUrl = () => `${this.config.api}/search?part=snippet&maxResults=20&order=date&channelId=${this.channelId}&key=${this.config.key}`;
  }
  Youtube.prototype.getActivities = function() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", this.activitiesUrl(), true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(JSON.parse(xhr.statusText));
          }
        }
      };
      xhr.onerror = function (e) {
        reject(JSON.parse(xhr.statusText));
      };
      xhr.send(null);
    })
  }

  Youtube.prototype.getChannelVideos = function() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", this.videosChannelUrl(), true);
      xhr.onload = (e) => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // this.send_message_to_sw(JSON.parse(xhr.responseText))
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(JSON.parse(xhr.statusText));
          }
        }
      };
      xhr.onerror = function (e) {
        reject(JSON.parse(xhr.statusText));
      };
      xhr.send(null);
    })
  }

  Youtube.prototype.setChannel = function(id){
    this.channelId = id;
    return this;
  }

  Youtube.prototype.send_message_to_sw = function(msg){
    return new Promise((resolve, reject) => {
      var OB = {
        data: msg,
        url: this.videosChannelUrl(),
      }
      navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'");
    })
  }

  return Youtube;
})()
//UC7tUsO3S7424TMcgSCUOCow

/*
Usage.
new y = Youtube() // Instantiates the Youtube Queries Object
y.setChannel(<ChannelId>) //Sets Channel Id for queries
y.getChannelVideos() // <Promise> Resolves to a "data" object with the videos on "data.items"
*/
