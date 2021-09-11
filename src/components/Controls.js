import React, { useState } from 'react'
import Terminal from './Terminal';

var ip = "192.168.31.72";
var port = "3000";
export default function Controls() {
    var actions = {
        "launch":1,
        "delete":2,
        "download image":3,
        "show": 4
    };
    var stat;
    const [text, setText] = useState("Enter Command Here");
    const clear = () => {
        setText("");
        var input = document.getElementsByName("actions");
        input[0].value="";
    }
    // copy to clipboard
    const copy = () => {
        if(text.length===0){
            alert("No text to copy");
        }
        else{
            var copyText = document.getElementById("terminal");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
        }
    }
    const [action, setAction] = useState("Launch");
    const onChange = (e) => {
        setText(e.target.value);
    }
    // handleReq
    const handleReq = (stat) => {
        // e.preventDefault();
        // setText("Due to the Handler");
        var elems = document.getElementsByName("subcommands");
        // console.log(elems[stat].innerHTML);
        var action = elems[stat].innerHTML.toLowerCase();
        setAction(elems[stat].innerHTML);
        exec(actions[action]);

    }
    // handleFirstReq
    const handleFirstReq = (action) => {
        // setText("Due to the Default Handler");
        // console.log(action);
        var act = action.toLowerCase();
        exec(actions[act]);
    }
    const exec = (action) => {
        // console.log(action); to check if the action is in the indexing, refer --> var actions above
        var default_image = "centos:latest";
        var input = document.getElementsByName("actions");
        input = input[0].value;
        // console.log(action);
        if (input === "") {
            alert("Empty Input, Please Enter Something(an image, container name, etc) before Submitting");
        }
        else{

            var cmd;
            if(action === 1) {
                cmd = `docker run -dit --name: ${input} ${default_image}`;
                console.log(cmd);
            }
            else if(action === 2) {
                cmd = `docker rm -f ${input}`;
                console.log(cmd);
            }
            else if(action === 3) {
                cmd = `docker pull ${input}`;
                console.log(cmd);
            }
            else if(action === 4) {
                cmd = `docker ps ${input}`;
                console.log(cmd);
            }
            else {
                console.log("errr....");
            }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `http://${ip}:${port}/cgi-bin/backend.py/?cmd=${cmd}`, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var data = xhr.responseText;
                    // console.log(data);
                    setText(data);
                }
            }
            console.log(input);
        }
    }
        const showImages = () => {
        var xhr = new XMLHttpRequest();
        var cmd = "ShAI";
        xhr.open('GET', `http://${ip}:${port}/${cmd}`, true);
        async function onload() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;
                    console.log(response);
                    setText(response);
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.onload = onload;
        xhr.onerror = function () {
            console.error(xhr.statusText);
        };
        xhr.send(null);
        console.log('show images')
    }
    const showContainers = () => {
        var xhr = new XMLHttpRequest();
        var cmd = "ShAC";
        xhr.open('GET', `http://${ip}:${port}/${cmd}`, true);
        async function onload() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;
                    console.log(response);
                    setText(response);
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.onload = onload;
        xhr.onerror = function () {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }
    const showInfo = () => {
        var xhr = new XMLHttpRequest();
        var cmd = "ShAIn";
        xhr.open('GET', `http://${ip}:${port}/${cmd}`, true);
        async function onload() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;
                    console.log(response);
                    setText(response);
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.onload = onload;
        xhr.onerror = function () {
            console.error(xhr.statusText);
        };
        xhr.send(null);
        console.log('show info');
    }
    const submit = () => {
        if (text !== "") {
            var xhr = new XMLHttpRequest();
            var cmd = text;
            xhr.open('GET', `http://${ip}:${port}/?cmd=${cmd}`, true);
            async function onload() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var response = xhr.responseText;
                        console.log(response);
                        setText(response);
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            }
            xhr.onload = onload;
            xhr.onerror = function () {
                console.error(xhr.statusText);
            };
            xhr.send(null);
        }
        else {
            alert("Empty Command, Please Enter a Command before Submitting");
        }
    }
    // console.log(text);
    return (
        <div className="container">
            <div className="input-group">
                <input name="actions" id="input" type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleFirstReq(action)}>{action}</button>
                <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><button name="subcommands" className="dropdown-item" onClick={() => {stat = 0; handleReq(stat); }}>Launch</button></li>
                    <li><button name="subcommands" className="dropdown-item" onClick={() => {stat = 1; handleReq(stat); }}>Delete</button></li>
                    <li><button name="subcommands" className="dropdown-item" onClick={() => {stat = 2; handleReq(stat); }}>Download Image</button></li>
                    <li><button name="subcommands" className="dropdown-item" onClick={() => {stat = 3; handleReq(stat); }}>Show</button></li>
                </ul>
            </div>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={showImages}>Show Images</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={showContainers}>Show Containers</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={showInfo}>Show Info</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={copy}>Copy to Clipboard</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={clear}>Clear</button>
            <Terminal text={text} onChange={onChange} />
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={submit}>Submit</button>
        </div>
    );
}