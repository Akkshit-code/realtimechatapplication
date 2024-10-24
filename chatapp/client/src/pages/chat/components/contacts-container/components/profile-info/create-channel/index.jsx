import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogContentText,
} from '@mui/material'; 
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData,addChannel } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
          withCredentials: true,
        });
        setAllContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getData();
  }, []);

  const createChannel = async () => {
    if (!channelName || selectedContacts.length === 0) {
      console.error("Channel name and contacts are required.");
      return;
    }

    try {
      const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
        name: channelName,
        members: selectedContacts.map((contact) => contact.value), // Assuming contact has a 'value' property
      },{withCredentials:true});
      if(response.status===201){
        setNewChannelModal(false);
        setChannelName("");
        setSelectedContacts([]);
        addChannel(response.data.channel);
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create a new channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModal} onClose={() => setNewChannelModal(false)}>
        <DialogContent className="bg-[#181920] border-none w-[400px] h-[400px] flex flex-col gap-10">
          <DialogContentText className="text-white">
            <span className="text-white ml-6">Please fill up the details for the new channel</span>
          </DialogContentText>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-4 bg-[#2c2e3b] text-white border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              options={allContacts}
              onChange={setSelectedContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">No results found</p>
              }
            />
          </div>
          <div>
            <Button 
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 text-white" 
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;