import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
} from 'react-vr';


export default class WelcomeToVR extends React.Component {
  constructor() {
    super();
    this.state = {
      rotation: 130,
    };
    this.spaceSkymap = [
      '../static_assets/space_right.png',
      '../static_assets/space_left.png',
      '../static_assets/space_up.png',
      '../static_assets/space_down.png',
      '../static_assets/space_back.png',
      '../static_assets/space_front.png'
    ];

    this.rotate = this.rotate.bind(this);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillMount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 150
      });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  render() {
    return (
      <View>
      <Pano source={ {uri: this.spaceSkymap} }/>

      <AmbientLight intensity={ 2.6 } />

      <Model
        style={{
          transform: [
            {translate: [10, 10, -100]},
            {scale: 0.2},
            //{rotateY: this.state.rotation},
          ],
        }}
        source={{obj:asset('moon.obj'), mtl:asset('moon.mtl')}}
        lit={true}
        />
        </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
