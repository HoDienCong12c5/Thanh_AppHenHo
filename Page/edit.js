import React, { useState, useEffect } from 'react'
import {Modal,Pressable,View, TextInput, Text, Button,ScrollView,TouchableOpacity, Alert,ToastAndroid,Image, StyleSheet, FlatList} from "react-native"
import {firebaseApp} from '../Config/Data';
import {db, auth,abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';
import * as ImagePicker  from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';

const edit =({navigation,route})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage,setSelectedImage]= useState(null)
    const [selectedImage1,setSelectedImage1]= useState(null)
    const [urlI,setUrLi] = useState(null)
    const [urlI1,setUrLi1] = useState(null)
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }; 
    const PickerUmageHandler=(p) =>{
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            if (response.assets) {
              const imageAssetsArray = response.assets[0].uri
              p==1?setSelectedImage(imageAssetsArray)
              :setSelectedImage1(imageAssetsArray)
            }
          }
        });
      }
     
    const {ids}=route.params;
    //Alert.alert("id: "+ids)

    const [anhDD, setAnhDD]=useState('')
    const [name,setName] = useState('')
    const [tuoi,setTuoi] = useState('')
    const [note,setNote] = useState('')
    const [adress,setAddress] = useState('')
    const [sex,setSex] = useState('Nam')
    const [job,setjob] = useState('')
    const [relationship,setRelationship] = useState('')
    const [heights,setHeights] = useState('')
    const [interests,setInterests] = useState('')
    const [travel,setTravel] = useState('')
    const [personality, setPersonality] = useState('')
    const [urlImgs, seturlImgs] = useState('');
    const [lImage,setLImage]= useState([])
    //Alert.alert(items.id)
    const getImage=async()=>{
      abb
            .ref('/users/' +ids+'/anh/' )
            .on('value', snapshot => {
                let l=[]
                snapshot.forEach(i => {
                  l.push(i.val().link)
                  console.log('link: '+i.val().link)
                })
                console.log('s??df  '+ l)
                setLImage(l)
            });
            console.log('s??df  '+ lImage.indexOf(1))
    }
    const getData = ()=>{

        //ToastAndroid.show('v???: '+items.id,ToastAndroid.SHORT)
        abb
            .ref('/users/'  )
            .on('value', snapshot => {
                snapshot.forEach(i => {
                    if(i.key==ids)
                    {
                        //Alert.alert(i.val().avatar)
                        let t={
                            ava:i.val().avatar,
                            ten: i.val().ten,
                            tuoi: i.val().tuoi,
                            ghichu: i.val().ghichu,
                            diachi: i.val().diachi,
                            gioitinh: i.val().gioitinh,
                            nghe : i.val().nghe,
                            quanhe: i.val().quanhe,
                            chieucao: i.val().chieucao,
                            sothich: i.val().sothich,
                            dulich: i.val().dulich,
                            tinhcach: i.val().tinhcach,
                        }
                        setSelectedImage(t.ava)
                        setAnhDD(t.ava)
                        setName(t.ten)
                        setTuoi(t.tuoi)
                        setjob(t.nghe)
                        setNote(t.ghichu)
                        setAddress(t.diachi)
                        if(t.gioitinh==0){
                            setSex('N???')
                        }
                        
                        setRelationship(t.quanhe)
                        setHeights(t.chieucao)
                        setInterests(t.sothich)
                        setTravel(t.dulich)
                        setPersonality(t.tinhcach)
                    }
                    
                    
                })
                getImage();
                console.log('jkj:   '+lImage[0])
            });
            
    }
    useEffect(getData,[]);
    //Alert.alert(ids)
    //l??u l??n database v?? l???y link
    const puImage = (t)=> {
        const {uri} = t==1?selectedImage:selectedImage1;
        const fileName = t==1? selectedImage.substring(
          selectedImage.lastIndexOf('/') + 1,
        ):selectedImage1.substring(
          selectedImage1.lastIndexOf('/') + 1,
        ) 
        const unLink = t==1? selectedImage:selectedImage1;
    
        const k = fileName.split('.')[0];
        let l = 'Anh/' + fileName;
        // console.log('sau s???t:   ' + fileName);
        const ref = storage().ref('Anh/' + fileName);
        const task =  ref.putFile(t==1?selectedImage:selectedImage1);
    
        task.then(async () => {
          const url = await ref.getDownloadURL()
          // onSuccess(url)
          t===1? setUrLi(url) : setUrLi1(url)
          let y=url;
          t==1? Insert(y):Post(y)
          console.log('d????ng link :' + y)
          //Alert.alert(url)
        })
      };
    //thay ?????ia nhr ?????i di???n v?? l???y link ???nh
    const capnhat= async()=>{
      let t=1
        puImage(t);
    }
    //C???p nh???t ???nh ?????i di???n v???i c??c n???i dung
    const Insert= async(y)=>{ 
      console.log('C???p nh???t:  '+selectedImage)   
       // Alert.alert('C???p nh???t h??? s??: '+y)
        await abb.ref('/users/'+ids).update({
            avatar: y==null?anhDD:y,
            ten: name,
             tuoi: tuoi,
            ghichu: note,
            diachi: adress,
            nghe : job,
            quanhe: relationship,
             chieucao: heights,
            sothich: interests,
            dulich: travel,
            tinhcach: personality,
        })
        ToastAndroid.show('C???p  nh???t th??nh c??ng!',ToastAndroid.SHORT)
    }
    //????ng h??nh ???nh l??n t??i kho???n
    const Danghinh= async(y)=>{
      let t=2
      selectedImage1==null?Alert.alert('B???n ch??a ch???n h??nh ???nh?'):
      puImage(t);
    }
    //post ???nh ????ng
    const Post=async(y)=>{
      //Alert.alert('???? ????n h??nh: '+y)
      console.log('????ng h??nh: '+selectedImage)
      selectedImage==null?Alert.alert('B???n ch??a ch???n h??nh?')
      : abb.ref('/users/'+ids+'/anh/').push().set({
        link:y
      })
      ToastAndroid.show('????ng h??nh th??nh c??ng',ToastAndroid.SHORT)
    }
    return (
        <View style={{flex:1, justifyContent:"center", alignItems: "center", backgroundColor:'#f5f5f5'}}>
            <ScrollView style={{flex:1, width:'90%' }}>
              <View>
                {lImage.map((link)=>{
                    <Image style={{height:200, width:200}} source={{uri: link}} />
                })}
              </View>
              
                <View style={{ padding:30, alignItems: "center",backgroundColor:'white', height:380,elevation: 10, borderBottomEndRadius:20,borderBottomLeftRadius:20 }}>
                    
                    <Image style={{height:height(28), width:width(55), borderRadius:200, backgroundColor:'red' }} source={{uri:selectedImage+''}} />
                    <TouchableOpacity
                        onPress={()=>PickerUmageHandler(1) }
                    >
                    <Image style={{ height:height(5), width:width(10), marginTop:-height(6),marginLeft:width(31)}} source source={require('../Image/Button/photo.png')} />
                    </TouchableOpacity>
                    <View style={{alignItems: "center", marginTop:10, width:300}}>
                        <View style={{display: 'flex',flexDirection:'row',}}>
                            <Text style={{fontSize:17, marginTop:10 }}>T??n: </Text>
                            <TextInput  placeholder='NH???p n???i dung...' value={name} onChangeText={text=>setName(text)} />
                        </View>
                        <View style={{display: 'flex',flexDirection:'row',}}>
                            <Text style={{fontSize:17, marginTop:10 }}>Ghi ch??: </Text>
                            <TextInput  placeholder='NH???p n???i dung...' value={note} onChangeText={text=>setNote(text)} />
                        </View>
                    </View>
                    {/* <View style={{display: 'flex',flexDirection:'row',justifyContent:'space-between', padding:5, marginTop:20}} >
                        <TouchableOpacity style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10}}>
                            <Text>CH???nh s???a th??ng itn</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10}}>
                            <Text>CH???nh s???a th??ng itn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10}}>
                            <Text>CH???nh s???a th??ng itn</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{ padding:30, backgroundColor:'white',elevation: 10, width:'100%', height:600, marginTop:30, fontSize:200, borderRadius:20}}>
                    <Text style={{fontSize:20 }}>Mi??u t??? b???n th??n</Text>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17 , marginTop:10}}>Tu???i: </Text>
                        <TextInput style={styles.input}  placeholder='NH???p n???i dung...' value={tuoi} onChangeText={text=>setTuoi(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17 , marginTop:10}}>Gi?????i t??nh: {sex}</Text>
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17 , marginTop:10}}>Ngh??? nghi???p: </Text>
                        <TextInput style={styles.input} placeholder='NH???p n???i dung...' value={job} onChangeText={text=>setjob(text)} />
                        
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>?????a ch???: </Text>
                        <TextInput  placeholder='NH???p n???i dung...' value={adress} onChangeText={text=>setAddress(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Quan h???: </Text>
                        <TextInput style={styles.input}  placeholder='NH???p n???i dung...' value={relationship} onChangeText={text=>setRelationship(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Chi???u cao: </Text>
                        <TextInput style={styles.input} placeholder='NH???p n???i dung...' value={heights} onChangeText={text=>setHeights(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>S??? th??ch: </Text>
                        
                        <TextInput style={styles.input} placeholder='NH???p n???i dung...' 
                        value={interests} 
                        onChangeText={text=>setInterests(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>T??nh c??ch: </Text>
                        <TextInput style={styles.input} placeholder='NH???p n???i dung...' value={personality} onChangeText={text=>setPersonality(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Du l???ch: </Text>
                        <TextInput style={styles.input} placeholder='NH???p n???i dung...' value={travel} onChangeText={text=>setTravel(text)} />
                    </View>
                    
                </View>
                <View style={{ paddingTop:10, backgroundColor:'white',elevation: 10, width:'100%',  marginTop:30, fontSize:200, borderRadius:20}}>
                <TouchableOpacity 
                        
                        style={{flexDirection:'row',justifyContent:"center",alignSelf:'center',width:120, backgroundColor:'pink',padding:10, margin:10,borderRadius:20,elevation: 10,}}
                        onPress={() =>setModalVisible(true)}>
                        <Image style={{height:30, width:30}} source={require('../Image/Button/image.png')}/>
                        <View style={{justifyContent:"center", alignItems:'center'}}>
                            <Text style={{width:80, }} >????ng h??nh</Text>
                        </View>
                    </TouchableOpacity>
                    
                    {/* <FlatList
                          data={lImage}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                      /> */}
                    <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{flexDirection:'row',}}>
                                <Text style={styles.modalText}>Ch???n h??nh ???nh </Text>
                                <TouchableOpacity
                                    onPress={()=>PickerUmageHandler(2)} 
                                >
                                <Image style={{ height:height(5), width:width(10), marginTop:-height(1)}} source source={require('../Image/Button/photo.png')} />
                                </TouchableOpacity>
                            </View>
                            
                            <Image style={{height:height(20), width:width(60), backgroundColor:'#dcdcdc', borderRadius:20}}
                             source={{uri: selectedImage1}}/>
                            <View style={{flexDirection:'row', padding:10 }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => Danghinh()}
                                >
                                    <Text style={styles.textStyle}>Ho??n t???t</Text>
                                </TouchableOpacity>
                                <Text>   </Text>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {setSelectedImage1(null),setModalVisible(!modalVisible)}}
                                >
                                    <Text style={styles.textStyle}>Tho??t</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </Modal>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent:"center", alignItems: "center",backgroundColor:'#fafad2',  marginTop:30, width:'90%', marginLeft:15, borderRadius:20,elevation: 10, }}>
                    <TouchableOpacity 
                    style={{flexDirection:'row',justifyContent:"center",padding:10,alignItems: "center",width:120, backgroundColor:'pink', margin:10,borderRadius:20,elevation: 10, }}
                    onPress={()=>capnhat()}>
                    <Image style={{height:30, width:30}} source={require('../Image/Button/image.png')}
                        />
                        <Text>C???p nh???t h??? s??</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity 
                        
                        style={{flexDirection:'row',justifyContent:"center",alignSelf:'flex-end',width:120, backgroundColor:'pink',padding:10, margin:10,borderRadius:20,elevation: 10,}}>
                        <Image style={{height:30, width:30}} source={require('../Image/Button/image.png')}/>
                        <View style={{justifyContent:"center", alignItems:'center'}}>
                            <Text style={{width:80, }} >H???y c???p nh???t</Text>
                        </View>
                    </TouchableOpacity>
                
                </View>
                <View style={{height:50}}></View>
            </ScrollView>
            
        </View>
    )
}
export default edit
const styles= StyleSheet.create({
    input:{
        fontSize:15, 
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "#f0fff0",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})