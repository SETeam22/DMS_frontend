
import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { secureFetch } from '../helper/SecureFetch';

const DirectChatPage = () => {
    const [username, setUsername] = useState('');
    const [searchedUser, setSearchedUser] = useState('');
    const userSecret = 'test'; // Assuming 'test' is the password

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await secureFetch('http://localhost:3000/api/auth/email', {
                    method: 'GET',
                });

                if (response.response.ok) {
                    console.log(response.data);
                    setUsername(response.data); // Assuming the API responds with { email: 'user's email' }
                } else {
                    console.error('Failed to fetch email');
                }
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        };

        fetchEmail();
    }, []);
    const usernames = username;

    function handleSearchUserChange(event) {
        setSearchedUser(event.target.value);
    }

    function createDirectChat(creds) {
        if (!searchedUser) {
            alert("Please enter a username to search.");
            return;
        }
        getOrCreateChat(
            creds,
            { is_direct_chat: true, usernames: [searchedUser] },
            (chat) => {
                console.log('Chat created or fetched successfully:', chat);
                setSearchedUser(''); // Reset the search input after chat creation
            }
        );
    }

    function renderChatForm(creds) {
        return (
            <div>
                <input
                    placeholder='Enter username to chat with'
                    value={searchedUser}
                    onChange={handleSearchUserChange}
                />
                <button onClick={() => createDirectChat(creds)}>
                    Create/Open Chat
                </button>
            </div>
        );
    }

    return (
        <ChatEngine
            height='60vh'
            projectID='591a44f0-5d2d-4343-a510-a7a87962c674'
            userName='bpniveditha@gmail.com'
            userSecret='test'
            renderNewChatForm={(creds) => renderChatForm(creds)}
        />
    );
};

export default DirectChatPage;

