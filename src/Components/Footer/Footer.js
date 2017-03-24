import React from 'react';
import { connect } from 'react-redux';
import './Footer.css';
import 'react-input-range/lib/css/index.css';

import InputRange from 'react-input-range';

import * as VideoActions from '../../Actions/VideoActions';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {dragging: false, time: 0};
  }

  componentDidMount() {
    console.log("footer::song", this.props.video.song.duration);

    setInterval(() => {
      if (this.props.video.player && this.state.isPlaying && !this.state.dragging){
        this.setState({ time: this.props.video.player.getCurrentTime() });
      }
    }, 250);
  }

  toggle = () => {
    if (this.state.isPlaying === true) {
      this.props.dispatch(VideoActions.pauseVideo());
    } else {
      this.props.dispatch(VideoActions.playVideo());
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  handleTimeChange = (value) => {
    this.setState({ dragging: true, time: value });
  }

  handleTimeChangeComplete = (value) => {
    this.setState({ dragging: false });
    this.props.dispatch(VideoActions.seekTo(value))
  }

  handleVolumeChange = (value) => {
    this.setState({volume: value});
    this.props.dispatch(VideoActions.setVolume(value))
  }

  format = (seconds) => {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec
  }

  render() {
    const volumeIcon = this.state.volume > 0 ? (this.state.volume >= 50 ? 'up' : 'down') : 'off';
    return (
      <div id="Footer">
        <div className="segment justify-content-start">
          <div>Beach Boys - Kokomo</div>
          <a>BeachBoysVEVO</a>
        </div>
        <div className="large segment flex flex-col justify-content-center">
          <div className="controllers">
            <a><i className="large random icon" /></a>
            <a><i className="large step backward icon" /></a>
            <a onClick={this.toggle} className="scale">
              <i className={`huge ${this.state.isPlaying ? "pause circle" : "video play"} outline icon`} />
            </a>
            <a><i className="large step forward icon" /></a>
            <a><i className="large refresh icon" /></a>
          </div>
          <div className="slider">
            <span className="label">{this.format(this.state.time)}</span>
            <InputRange
              minValue={0}
              maxValue={this.props.video.song.duration}
              value={this.state.time}
              onChange={this.handleTimeChange}
              onChangeComplete={this.handleTimeChangeComplete} />
            <span className="label">{this.format(this.props.video.song.duration)}</span>
          </div>
        </div>
        <div className="segment flex-row justify-content-end">
          <div className="volume slider flex-fill">
            <span className="label">
              <i className={`large volume ${volumeIcon} icon`} />
            </span>
            <InputRange
              minValue={0}
              maxValue={100}
              value={this.props.video.volume}
              onChange={this.handleVolumeChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    video: store.video
  }
})(Footer);
