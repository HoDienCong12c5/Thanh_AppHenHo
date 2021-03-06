import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
} from 'react-native';
import {db, auth, abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';
import {Modal, Portal, Provider, Button} from 'react-native-paper';

const About = ({navigation, route}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  let md = (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}>
      <Text>Example Modal. Click outside this area to dismiss.</Text>
    </Modal>
  );

  const {id} = route.params;
  //Alert.alert("id: "+id)

  const [anhDd, setAnhDd] = useState('');
  const [name, setName] = useState('');
  const [tuoi, setTuoi] = useState('');
  const [note, setNote] = useState('');
  const [adress, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [job, setjob] = useState('');
  const [relationship, setRelationship] = useState('');
  const [heights, setHeights] = useState('');
  const [interests, setInterests] = useState('');
  const [travel, setTravel] = useState('');
  const [personality, setPersonality] = useState('');
  const [like, setLike] = useState('');
	const [listAnh, setListAnh] = useState([])
  const getData = () => {
    abb.ref('/users/').on('value', snapshot => {
      let t = {};
      snapshot.forEach(i => {
        if (i.key == id) {
          t = {
            avatar: i.val().avatar,
            ten: i.val().ten,
            tuoi: i.val().tuoi,
            ghichu: i.val().ghichu,
            diachi: i.val().diachi,
            gioitinh: i.val().gioitinh,
            nghe: i.val().nghe,
            quanhe: i.val().quanhe,
            chieucao: i.val().chieucao,
            sothich: i.val().sothich,
            dulich: i.val().dulich,
            tinhcach: i.val().tinhcach,
          };
        }

        console.log('User data: ', t.ten);
        setAnhDd(t.avatar);
        setName(t.ten);
        setTuoi(t.tuoi);
        setNote(t.ghichu);
        setAddress(t.diachi);
        if (t.gioitinh == 1) {
          setSex('Nam');
        } else {
          setSex('N???');
        }
        setjob(t.nghe);
        setHeights(t.chieucao);
        setRelationship(t.quanhe);
        setInterests(t.sothich);
        setTravel(t.dulich);
        setPersonality(t.tinhcach);
      });
    });
  };
  useEffect(getData, []);
  const Edits = () => {
    // Alert.alert("nh???n"+name)
    navigation.navigate('edit', {ids: id});
  };
  const LoadImage = async () => {
    abb.ref('/users/' + id + '/listanh/').on('value', snapshot => {
		let l=[]
      snapshot.forEach(i => {
		l.push(i.val().url)
	  });
	  setListAnh(l)
    });
  };
  const PostAnh=()=>{
	  
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView style={{flex: 1, width: '90%'}}>
        <View
          style={{
            backgroundColor: '#ffffe0',
            marginTop: 10,
            padding: 0,
            alignItems: 'center',
            height: 430,
            width: width(90),
            elevation: 10,
            borderRadius: 20,
          }}>
          <View
            style={{
              backgroundColor: 'blue',
              marginTop: 20,
              borderRadius: 200,
              backgroundColor: '#ffffe0',
            }}>
            <Image
              style={{
                borderColor: 'red',
                borderWidth: 1,
                height: height(27),
                width: width(55),
                borderWidth: 1,
                borderRadius: 100,
              }}
              source={{uri: anhDd}}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 10, width: 300}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>t??n {name}</Text>
            <Text style={{color: '#d2691e'}}>ph???n caauchur ????? {note}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              marginTop: 20,
            }}>
            {/* <Image source={require('../Image/Button/image.png')}/> */}
            <TouchableOpacity
              onPress={Edits}
              style={{
                flexDirection: 'row',
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                backgroundColor: '#fff8dc',
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../Image/Button/spen.png')}
              />
              <Text style={{fontWeight: 'bold', width: 50}}>S???a h??? s??</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                backgroundColor: '#fff8dc',
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
			  onPress={()=>Alert.alert('????ng h??nh')}
			  >
              <Image
                style={{height: 30, width: 30}}
                source={require('../Image/Button/image.png')}
              />
              <Text style={{fontWeight: 'bold', width: 50}}>????ng h??nh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                backgroundColor: '#fff8dc',
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={() => Alert.alert('??anhan')}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../Image/Button/image.png')}
              />
              <Text style={{fontWeight: 'bold', width: 50}}>????ng xu???t</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            padding: 30,
            backgroundColor: '#ffffe0',
            elevation: 10,
            width: '100%',
            height: 450,
            marginTop: 30,
            fontSize: 200,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text style={{fontSize: 20}}>Mi??u t??? b???n th??n</Text>
          <Text style={{fontSize: 17, marginTop: 15}}>Tu???i: {tuoi} </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>Gi???i t??nh: {sex} </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>
            Chi???u cao: {heights}{' '}
          </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>Ngh??? nghi???p: {job} </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>?????a ch???: {adress} </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>
            Quan h???: {relationship}{' '}
          </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>
            S??? th??ch: {interests}{' '}
          </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>Du l???ch: {travel} </Text>
          <Text style={{fontSize: 17, marginTop: 10}}>
            T??nh c??ch: {personality}{' '}
          </Text>
          {/* <TextInput 
                        value={name}
                    ></TextInput> */}
        </View>
        {/* <View style={{display: 'flex',flexDirection:'row', justifyContent:"center", alignItems: "center",backgroundColor:'white',  marginTop:30}}>
                    <TouchableOpacity 
                        style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10,}}
                        onPress={Edit}
                    >
                        <Text>CH???nh s???a th??ng itn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:100, backgroundColor:'pink', margin:10}}>
                        <Text>CH???nh s???a th??ng itn</Text>
                    </TouchableOpacity>
                </View> */}
      </ScrollView>
    </View>
  );
};
export default About;
