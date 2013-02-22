/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var self = this,
            $device = $("#deviceinfo");

        $device.find("#name").html(window.device.name);
        $device.find("#phonegap").html(device.cordova);
        $device.find("#plateform").html(device.platform);
        $device.find("#uuid").html(device.uuid);
        $device.find("#version").html(device.version);
        $device.find("#model").html(device.model);

        var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 1000 }),
            $watchAcceleration = $("#watchAcceleration");

        function onSuccess(acceleration) {alert("ok");
            $watchAcceleration.find("#ax").html(acceleration.x);
            $watchAcceleration.find("#ay").html(acceleration.y);
            $watchAcceleration.find("#az").html(acceleration.z);
            $watchAcceleration.find("#aTime").html(acceleration.timestamp);
        };

        function onError() {
            alert('in Acceleration Error!');
        };

        var $image = $("#getPicture");

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 

        function onSuccess(imageURI) {
            $image.find("img").attr("src", imageURI).attr("alt", imageURI);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }            

        var $geoLocation = $("#geoLocation");

        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { frequency: 3000 }); 

        function onGeoSuccess(position) {
            $geoLocation.find("#lat").html(position.coords.latitude);
            $geoLocation.find("#lon").html(position.coords.longitude);
        }

        function onGeoError(message) {
            alert('Failed because: ' + message);
        } 

        $("#notifyMe").on("click", function(){
            navigator.notification.alert("I am alert message Boss!", self.alertMe, "Alert Me");
        });
    },
    alertMe: function (data){
        alert("I'm Done!");
    }

};

$("#myForm").on("blur", "input", function(){
    var key = $(this)[0].name,
        value = $(this).val();
    localStorage[key] = value;
});

$("#localStorage").on("pageshow", function(){

    var name = localStorage.name,
        email = localStorage.email;
        
     if(name !== undefined && name.length > 0){
        $("#myname").val(name);
     }   

     if(email !== undefined && email.length > 0){
        $("#email").val(email);
     }   

});

    

