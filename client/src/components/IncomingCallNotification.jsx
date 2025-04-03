import React from "react";
import { BsCameraVideo } from "react-icons/bs";

const IncomingCallNotification = ({ incomingCall, joinVideoCall, rejectVideoCall }) => {
    if (!incomingCall) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 max-w-md">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                    <BsCameraVideo className="text-blue-500 text-xl" />
                </div>
                <div>
                    <h3 className="font-medium">Incoming Video Call</h3>
                    <p className="text-gray-600">{incomingCall.caller}</p>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => rejectVideoCall(incomingCall)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                    Decline
                </button>
                <button
                    onClick={() => joinVideoCall(incomingCall)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Answer
                </button>
            </div>
        </div>
    );
};

export default IncomingCallNotification;