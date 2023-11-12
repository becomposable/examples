import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";
import { keys } from "./App";



interface DocumentPickerProps {
    actionName: string;
    onSelect: (doc: DocumentLink) => void;
    setAuthToken: (token: string) => void;
}

export interface DocumentLink {
    docId: string;
    url: string;
    name: string;
}

export default function DocumentPicker ({ actionName = "Select Document", onSelect, setAuthToken }: DocumentPickerProps) {
    console.log("rendering document picker");
    const [openPicker, authResponse] = useDrivePicker();

    useEffect(() => {
        if (authResponse?.access_token) {
            console.log("Setting AuthResponse", authResponse);
            setAuthToken(authResponse.access_token);
        } else {
            console.log("No auth token");
        }
    }, [authResponse]);

    const handleOpenPicker = () => {
        openPicker({
            clientId: keys.clientId,
            developerKey: keys.devKey,
            setOrigin: window.location.origin,
            viewId: 'DOCUMENTS',
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                console.log('on callback function', data);
                if (data.action !== 'picked') {
                    console.log('Document not picked yet');
                    return;
                }
                onSelect({
                    docId: data.docs[0].id,
                    name: data.docs[0].name,
                    url: data.docs[0].url
                });
            },
        });
    };

    return (
        <div>
            <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenPicker}>
                {actionName}
            </button>
        </div>
    );

}