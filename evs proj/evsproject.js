var telegram = require('telegram-bot-api')
var request = require('request') ;  
var GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const {promisify}= require('util');
const creds = require('./client_secret.json');

var input1,input2,input31,input3,input4,input5,input6,input7,input8,input9;
var tname, tid,ttime, input10;
var a=[];
async function accessSpreadsheet(){
const doc = new GoogleSpreadsheet('1bL83tJd2r99SbgUkFuoXJIsk45BlMgUFU9-r8Ng0ddY');
await promisify (doc.useServiceAccountAuth)(creds);
const info= await promisify(doc.getInfo)();
const sheet = info.worksheets[0];
console.log(`Title:${sheet.title},rows:${sheet.rowCount}`)
const row={userid :tid,
    name: tname,
    q1 : input1,
    q2 : input2,
    q3 : input3,
    q31 : input31,
    q4 : input4,
    q5 : input5,
    q6 : input6,
    q7 : input7,
    q8 : input8,
    q9 : input9,
    q10: input10,
    time : ttime

}

await promisify(sheet.addRow)(row);

}


//AIzaSyA0CX-ea5O7XlGpRIWaeZNwHtdqUTKzAvI   google api places


var api = new telegram({
    token: '798644496:AAEqH-pReTREchOLbLMYFCnnS63BxVBeSlE',
    updates: {
                enabled: true
             }
});

api.on('message', function(message)
{   console.log("======All msg Details=====")
    console.log(message)
    tname =message.chat.first_name+" "+message.chat.last_name;
    ttime= message.date;
    tid=message.chat.username;
    var chat_id = message.chat.id;
    if (message.text=="hi"){
      
    var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'let\'s do the survey',
                    callback_data: '0-1'
                },
                {
                    text: 'lets see the analysis',
                    callback_data: '0-2'
                }
        ]]
    }
  //if
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Weclome '+message.chat.username+'  \nThis is an initiative-bot designed to collect information about your waste management and provide you with suitable sustainable development techniques all you have to do is to ',
        reply_markup: JSON.stringify(inlineKeyboard)
    })

api.on('inline.callback.query', function(msg) {
	 var data = msg.data;
	// massage.text=null;
if (data=="0-1"){
  api.sendMessage({
        chat_id:message.chat.id,
        text: 'Thank you for choosing Sustainable Future !\nBut before we can give you the solution could you complete the surevey',   
    })
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'urban',
                    callback_data: '1-1'
                },
                {
                    text: 'rural',
                    callback_data: '1-2'
                }
            ],
        ]
    };

/*
| 1-1 | 1-2 |
*/

api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q1: Do you live in a urban or rural area ',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "1-1"){ input1='urban'
question2(msg)}
    if (data=="1-2"){ input1='rural'
question2(msg)}


})
}
if (data=="0-2"){//for excel values 
}	
analysisfact    ();
})

}
function question2(msg){
/////////////////////////////////////////////2
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '2-1'
                },
                {
                    text: 'no',
                    callback_data: '2-2'
                }
            ],
           
        ]
    };

/*
| 1-1 | 1-2 |
*/

api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q2: Do you have livestocks?',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "2-1"){input2='yes'
question3(msg)
}
    if (data=="2-2"){ input2='no'
question3(msg)}

})
/////////////////////////////////////////////2
}

function question3(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '3-1'
                },
                {
                    text: 'no',
                    callback_data: '3-2'
                }
            ],
           
        ]
    };

api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q3:  Do you have biogas plant at your home? ',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "3-1"){ input3='yes'
question4()
}
    if (data=="3-2"){input3='no'
question31()}


})
}
function question31(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '31-1'
                },
                {
                    text: 'no',
                    callback_data: '31-2'
                }
            ],
           [
           {
                    text: 'skip',
                    callback_data: '31-2'
           }
           ]
        ]
    };

api.sendMessage({
        chat_id:message.chat.id,
        text: 'Would you like to get a biogas connection(if you dont have)',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "31-1"){ input31='yes'
question4()}
    if (data=="31-2"){ input31='no'
question4()}
 if (data=="31-2"){ input31='skipped'
question4()}

})
}
function question4(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '4-1'
                },
                {
                    text: 'no',
                    callback_data: '4-2'
                }
            ],
           
        ]
    };
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q4: Do you handle waste by using proper methods?',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "4-1"){ input4='yes'
question5()}
    if (data=="4-2"){input4='no'
question5()}


})
}
function question5(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '5-1'
                },
                {
                    text: 'no',
                    callback_data: '5-2'
                }
            ],
           
        ]
    };
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q5: do you dispose the biodegradable waste in pit made in your backyard?',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "5-1"){ input5='yes'
question6()}
    if (data=="5-2"){ input5='no'
question6()}


})
}

function question6(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '6-1'
                },
                {
                    text: 'no',
                    callback_data: '6-2'
                }
            ],
           
        ]
    };

api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q6: have you tried turning waste into manure and fertiliser? ',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "6-1"){ input6='yes'
question7()}
    if (data=="6-2"){ input6='no'
question7()}


})
}
function question7(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '7-1'
                },
                {
                    text: 'no',
                    callback_data: '7-2'
                }
            ],
           
        ]
    };
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q7: Do you sort waste into three',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "7-1"){ input7='yes'
question8()}
    if (data=="7-2"){ input7='no'
question8()}


})
}
function question8(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '8-1'
                },
                {
                    text: 'no',
                    callback_data: '8-2'
                }
            ],
           
        ]
    };
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q8: Do you burn plastic waste',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "8-1"){ input8='yes'
question9()}
    if (data=="8-2"){ input8='no'
question9()}


})
}
function question9(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '9-1'
                },
                {
                    text: 'no',
                    callback_data: '9-2'
                }
            ],
           
        ]
    };
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q9: do you give up the plastic waste for recycling after collecting?',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "9-1"){ input9='yes'
question10(); 
 }
    if (data=="9-2"){ input9='no'
        question10();
}


})
}
function question10(msg){
var inlineKeyboard = {
        inline_keyboard: [
            [
                {
                    text: 'yes',
                    callback_data: '10-1'
                },
                {
                    text: 'no',
                    callback_data: '10-2'
                }
            ],
           
        ]
    };
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q10: did you know you could extract gold from eWaste?',
        reply_markup: JSON.stringify(inlineKeyboard)
    })
api.on('inline.callback.query', function(msg) {

    var data = msg.data;
if (data== "10-1"){ input10='yes' 
accessSpreadsheet(); }
    if (data=="10-2"){ input10='no'
accessSpreadsheet(); }


})
}

function analysis_part(){
if (input2=='yes' && input6=='no'){
api.sendMessage({
        chat_id:message.chat.id,
        text: 'It is a well-known fact that fertilizers are necessary to be added in soil to increase the yield of crops. Particularly, the chemical fertilizer (NPK) has increased the crop production considerably. But long-time use of NPK is harmful for sustainability of crop production. Long-time use of chemical and organic fertilizers significantly affects the quality and... \n  Read more at: https://link.springer.com/article/10.1007/s40093-014-0050-6 ',
    })
}

api.sendMessage({
        chat_id:message.chat.id,
        text: 'Don\'t worry we are here to help you handle your waste\n\n Part1:Reducing Your Garbage\n1.Use cloth bags instead of plastic \n2.Buy food that has less packaging\n3.Do vermicomposting\n4.Don\'t use bottled drinks unless you have to.\n5.Reduce your paper usage.\n6.Consider making your own household cleaners and detergents\n\n Part2: Reusing and Recycling\n1.Donate items when possible\n2.Reuse containers\n3.Follow your city\'s recycling policies\n4.Dispose of trash and hazardous waste properly\n\nPart3:Composting\n1.Save your food scraps and yard cuttings from the trash\n2.Create a compost site.\n3.Choose to make either a cold or hot compost heap\n4.Maintain your compost site.\n5.Use your compost when it\'s ready.'
            })

}

async function analysisfact(){
const doc = new GoogleSpreadsheet('1bL83tJd2r99SbgUkFuoXJIsk45BlMgUFU9-r8Ng0ddY');
await promisify (doc.useServiceAccountAuth)(creds);
const info= await promisify(doc.getInfo)();
const sheet = info.worksheets[0];
console.log(`Title:${sheet.title},rows:${sheet.rowCount}`)
const cells = await promisify(sheet.getCells)({
'min-row':2,
'max-row':11,
'min-col':20,
'max-col':20
})
var i=1;

for (const cell of cells){console.log("***")
a[i]=cell.value

console.log(a[i]+'%')
i=i+1;
}

printanaldata()
}

function printanaldata(){
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Do you have livestocks?\n yes :'+a[1]+'%',
    })
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Q3:  Do you have biogas plant at your home?\n yes :'+a[2]+'%',
    })
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Would you like to get a biogas connection(if you dont have)\n yes :'+a[3]+'%',
    })
api.sendMessage({
        chat_id:message.chat.id,
        text: ' Do you handle waste by using proper methods?\n yes :'+a[4]+'%',
    })
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Do you dispose the biodegradable waste in pit made in your backyard?\n yes :'+a[5]+'%',
    })
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Have you tried turning waste into manure and fertiliser?\n yes :'+a[6]+'%',
    })
api.sendMessage({
        chat_id:message.chat.id,
        text: 'Do you sort waste into three\n yes :'+a[7]+'%',
    })
    api.sendMessage({
        chat_id:message.chat.id,
        text: 'Do you burn plastic waste\n yes :'+a[8]+'%',
    })
      api.sendMessage({
        chat_id:message.chat.id,
        text: 'Do you give up the plastic waste for recycling after collecting?\n yes :'+a[9]+'%',
    })
        api.sendMessage({
        chat_id:message.chat.id,
        text: ' Did you know you could extract gold from eWaste?\n yes :'+a[10]+'%',
    })
}




})
