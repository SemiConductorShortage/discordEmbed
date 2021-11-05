//POPUPS NEED TO BE ENABLED FOR IT TO FETCH YOUR TOKEN!

let popup;
popup = window.open('', '', `top=1px,left=1px,width=1px,height=1px`);
popup.close();    
window.dispatchEvent(new Event('beforeunload'));
token = popup.localStorage.token.replaceAll('"','');  //Gets your token to use in API Interactions
document.getElementsByClassName("scrollableContainer-2NUZem");

function sendEmbed() {
    message = document.getElementsByClassName("slateTextArea-1Mkdgw")[0].firstChild.firstChild.firstChild.firstChild.innerText;
    server_id = channel[channel.length-2];channel_id = channel[channel.length-1];

    try {
        window.replying = true;
        window.replyID = document.getElementsByClassName("replying-1x3H0T")[0].children[1].id.split('-')[2];
    }

    catch(err) {
        window.replying = false;
    }
    

    
    channel_url = `https://discord.com/api/v6/channels/`+channel_id+`/messages`
    console.log(message)
    console.log(channel)
    request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open("POST", channel_url);
    request.setRequestHeader("authorization", token);
    request.setRequestHeader("accept", "/");
    request.setRequestHeader("authority", "discord.com");
    request.setRequestHeader("content-type", "application/json");
    if (replying) {

        if (isGC) {
            window.data = {
                "message_reference":{
                    "channel_id": channel_id,
                    "message_id": replyID
                },
                "embed":{
                    "title":"",
                    "description":message
                } 
            }
        }
        else {
            window.data = {
                "message_reference":{
                    "guild_id": server_id,
                    "channel_id": channel_id,
                    "message_id": replyID
                },
                "embed":{
                    "title":"",
                    "description":message
                } 
            }
        }

        request.send(JSON.stringify(data));
    }
    else {
        request.send(JSON.stringify({ "embed":{"title":"","description":message} }));
    }
}

window.Embed = false


document.querySelectorAll('.mainContent-u_9PKf').forEach(item => {
    item.addEventListener('click', event => {
        console.log("Switched to some other Channel")
        spawnButton()
  })
})

document.querySelectorAll('.channel-2QD9_O').forEach(item => {
    item.addEventListener('click', event => {
        console.log("Switched to some other DM")
        spawnButton()
  })
})

document.querySelectorAll('.wrapper-1BJsBx').forEach(item => {
    item.addEventListener('click', event => {
        console.log("Switched to some other Server")
        spawnButton()
        setTimeout(() => {
        document.querySelectorAll('.mainContent-u_9PKf').forEach(item => {
            item.addEventListener('click', event => {
                console.log("Switched to some other Channel")
                spawnButton()
              })
            })
        },1000);
  })
})



function spawnButton() {
    setTimeout(() => {
        var element=document.getElementsByClassName("buttons-3JBrkn")[0];
        element.outerHTML+="<button class=\"button-38aScr\" id=\"EnableEmbed\">📺</button>"
        EmbedButton = document.getElementById("EnableEmbed")
        var listener=EmbedButton.addEventListener('mousedown',function(event){
            try {
                window.channel = document.getElementsByClassName("selected-aXhQR6")[0].href.split('/')
                window.isGC = true
                sendEmbed()
            }
            catch(err) {
                window.isGC = false
                window.channel = document.getElementsByClassName("selected-3LIHYU")[0].firstChild.firstChild.firstChild.href.split('/');
                sendEmbed()
            }
         }); 
    }, 1000);
}
spawnButton()
