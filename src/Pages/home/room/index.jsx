import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len = 5) {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

const RoomPage = () => {
    const { roomId } = useParams();
    const meetingRef = useRef(null);

    useEffect(() => {
        const initializeMeeting = async () => {
            console.log("Initializing meeting for room:", roomId);
            
            if (meetingRef.current && roomId) {
                try {
                    const appID = 2024486246;
                    const serverSecret = "f0988b3756f7b704c44f094e5dd1f4b2";
                    
                    // Use randomID for userID and userName for better uniqueness
                    const userID = randomID(8);
                    const userName = "User_" + randomID(4);
                    
                    console.log("Generating token for user:", userName);
                    
                    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                        appID, 
                        serverSecret, 
                        roomId, 
                        userID,
                        userName
                    );

                    console.log("Token generated, creating ZegoUIKit instance");
                    
                    const zp = ZegoUIKitPrebuilt.create(kitToken);
                    
                    console.log("Joining room...");
                    
                    await zp.joinRoom({
                        container: meetingRef.current,
                        sharedLinks: [
                            {
                                name: 'Personal link',
                                url: window.location.href,
                            },
                        ],
                        scenario: {
                            mode: ZegoUIKitPrebuilt.VideoConference,
                        },
                        showScreenSharingButton: true,
                        showTextChat: true,
                        showUserCount: true,
                        maxUsers: 50,
                        onJoinRoom: () => {
                            console.log("Successfully joined room:", roomId);
                        },
                        onLeaveRoom: () => {
                            console.log("Left room:", roomId);
                        },
                        onUserJoin: (users) => {
                            console.log("User joined:", users);
                        },
                        onUserLeave: (users) => {
                            console.log("User left:", users);
                        }
                    });
                    
                    console.log("Room joined successfully");
                } catch (error) {
                    console.error("Error initializing ZegoCloud:", error);
                }
            } else {
                console.error("Missing meetingRef or roomId", { 
                    hasRef: !!meetingRef.current, 
                    roomId 
                });
            }
        };

        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            initializeMeeting();
        }, 100);

        return () => clearTimeout(timer);
    }, [roomId]);

    return (
        <div className="room-page" style={{ width: '100%', height: '100vh' }}>
            <div 
                ref={meetingRef} 
                style={{ 
                    width: '100%', 
                    height: '100%',
                    minHeight: '500px'
                }}
            />
        </div>
    );
};

export default RoomPage;