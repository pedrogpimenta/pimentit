import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props);

    // Stops bullshit if there's no need
    if (!this.props.identifier) return false

    this.player.on('play', () => {
      if (this.props.identifier.indexOf(`audio`) >= 0) return false;
      const audioPlayer = document.querySelectorAll(`.audio-js-${this.props.identifier} video`)[0];

      audioPlayer.play();
    })

    this.player.on('pause', () => {
      if (this.props.identifier.indexOf(`audio`) >= 0) return false;
      const audioPlayer = document.querySelectorAll(`.audio-js-${this.props.identifier} video`)[0];

      audioPlayer.pause();
    })

    this.player.on('volumechange', () => {
      if (this.props.identifier.indexOf(`audio`) >= 0) return false;
      const audioPlayer = document.querySelectorAll(`.audio-js-${this.props.identifier} video`)[0];

      if (this.player.muted()) {
        audioPlayer.muted = true;
      } else {
        audioPlayer.muted = false;
        audioPlayer.volume = this.player.volume();
      }
    })

    this.player.on('seeking', () => {
      if (this.props.identifier.indexOf(`audio`) >= 0) return false;
      const audioPlayer = document.querySelectorAll(`.audio-js-${this.props.identifier} video`)[0];

      audioPlayer.currentTime = this.player.currentTime();
    })

    // TODO: what is this?
    this.player.on('timeupdate', () => {
      if (this.props.identifier.indexOf(`audio`) >= 0) return false;
      const audioPlayer = document.querySelectorAll(`.audio-js-${this.props.identifier} video`)[0];

      if (this.player.paused) {
        return false;
      }

      audioPlayer.emit(`timeupdate`);
    })
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className={`video-js ${this.props.identifier}`}>
          </video>
        </div>
      </div>
    )
  }
}