import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform,Button, View,AsyncStorage } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios"

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:[],
      Myposts:[]
      
    }
   }
  componentDidMount(){
    this.getUserInfo()
    this.getUserPost()
    // console.log(this.state.user)
  }
  
async getUserInfo(){
await AsyncStorage.getItem("response").then((res)=>{
var x = JSON.parse(res)
console.log( x.id_User)
axios.get(`http://192.168.22.200:3000/api/user/info/${x.id_User}`).then(({data})=>{
  console.log('fffff',data)
  this.setState({
    user:data[0]
  })
  // console.log(this.state.user)
}).catch((err)=>{
  console.log(err)
})


})

}

async getUserPost(){
  await AsyncStorage.getItem("response").then((res)=>{
  var x = JSON.parse(res)
  console.log( x.id_User)
  axios.get(`http://192.168.22.200:3000/api/posts/getUserPost/${x.id_User}`).then(({data})=>{
    console.log("aaa",data)
    this.setState({
      Myposts:data
    })
    // console.log(this.state.user)
  }).catch((err)=>{
    console.log(err)
  })
  
  
  })
  
  }

render() {
  console.log(this.state.Myposts)
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={{uri: this.state.user.picture}}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>{this.state.user.username}</Text>
              <Block row space="between">
                <Block row>
                  <Block middle style={styles.pro}>
                    <Text size={6.5} color="white"></Text>
                  </Block>
                  <Text color="white" size={16} muted style={styles.seller}>{this.state.user.categorie}</Text>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                  </Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {` `} Tunis, TN
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
            <Block middle>
              <Text bold size={12} style={{marginBottom: 8}}>6</Text>
              <Text muted size={12}>Publication</Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{marginBottom: 8}}>5</Text>
              <Text muted size={12}>Followers</Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{marginBottom: 8}}>2</Text>
              <Text muted size={12}>Messages</Text>
            </Block>
          </Block>
          <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>Recently viewed</Text>
            <Text size={12} color={theme.COLORS.PRIMARY} onPress={() => this.props.navigation.navigate('Home')}>View All</Text>
          </Block>
          <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
            <Block row space="between" style={{ flexWrap: 'wrap' }} >
              {this.state.Myposts.map((post, index) => {
              return <Image
                  source={{ uri: post.picture }}
                   key={index}
                  resizeMode="cover"
                  style={styles.thumb}
                />
              })}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}
}
const styles = StyleSheet.create({
profile: {
  marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  marginBottom: -HeaderHeight * 2,
  backgroundColor: '#000000'
},
profileImage: {
  width: width * 1.1,
  height: 'auto',
},
profileContainer: {
  width: width,
  height: height / 2,
},
profileDetails: {
  paddingTop: theme.SIZES.BASE * 4,
  justifyContent: 'flex-end',
  position: 'relative',
},
profileTexts: {
  paddingHorizontal: theme.SIZES.BASE * 2,
  paddingVertical: theme.SIZES.BASE * 2,
  zIndex: 2
},
pro: {
  backgroundColor: materialTheme.COLORS.LABEL,
  paddingHorizontal: 6,
  marginRight: theme.SIZES.BASE / 2,
  borderRadius: 4,
  height: 19,
  width: 38,
},
seller: {
  marginRight: theme.SIZES.BASE / 2,
},
options: {
  position: 'relative',
  padding: theme.SIZES.BASE,
  marginHorizontal: theme.SIZES.BASE,
  marginTop: -theme.SIZES.BASE * 7,
  borderTopLeftRadius: 13,
  borderTopRightRadius: 13,
  backgroundColor: theme.COLORS.WHITE,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 8,
  shadowOpacity: 0.2,
  zIndex: 2,
},
thumb: {
  borderRadius: 4,
  marginVertical: 4,
  alignSelf: 'center',
  width: thumbMeasure,
  height: thumbMeasure
},
gradient: {
  zIndex: 1,
  left: 0,
  right: 0,
  bottom: 0,
  height: '30%',
  position: 'absolute',
},
});





