import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements'

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state={
          text : '',
          displayText : ''
        }
      }
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
        return fetch(url)
        .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }
        })
        .then((response)=>{
            var resopnseObject = response
            if (resopnseObject) 
            {
             var wordData = resopnseObject.definitions[0]
             var definition = wordData.descriptionvar 
             var lexicalCategory =  wordData.wordtype

             this.setState({
                 "word": this.state.text,
                 "definition" : definition,
                 "lexicalCategory" : lexicalCategory
             })
            }
            else
            {
            this.setState({
                "word": this.state.text,
                "definition" : "Not Found",
            })
            }
        })
    }
    
    render() {
       <View>
        <View>
            <Text>
                Type : {""}
            </Text>
            <Text style={{fontSize : 18}}>
                {this.state.word}
            </Text>
        </View>
        <View>
          <Text>
              Type : {""}
          </Text>
          <Text style={{fontSize : 18}}>
                {this.state.lexicalCategory}
            </Text>
         </View>
         <View style={{flexDirection : 'row', flexWrap : 'wrap'}}>
             <Text>
                 Definition : {""}
             </Text>
             <Text style={{fontSize : 18}}>
                {this.state.definition}
            </Text>
         </View>
         
        </View>

        
        return (
          <View style={styles.container}>
          <Header backgroundColor = 'red'
          centerComponent ={{text:"Pocket-Dictionary",style:{color:'white',fontSize:'50'}}}>
          </Header>  
          <TouchableOpacity style={styles.searchBox}
          onPress={()=>{
              this.setState({isSearchPressed:true});
              this.getWord(this.state.text)
          }}>
          SEARCH
          </TouchableOpacity>
          <TextInput
          style={styles.inputBox}
          onChangeText={text =>{
              this.setState({
                  text:text,
                  isSearchPressed : false,
                  word : "Loading...",
                  lexicalCategory : "",
                  examples : [],
                  defination : ""
              });
          }} 
          value={this.state.text} 
          />
         
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#b8b8b8',
     },
     inputBox:{
       marginTop : 20,
       marginBottom : 200,
       width : '80%',
       alignSelf : 'center',
       height : 40,
       textAlign : 'center',
       borderWidth : 4,
       outline : 'none'
     },
     searchBox : {
        marginBottom : 1,
        marginTop: 20,
        width : '30%',
        alignSelf : 'center',
        marginLeft : 2,
        height : 40,
        textAlign : 'center',
        borderWidth : 2,
        outline : 'none'
     }
   });
   