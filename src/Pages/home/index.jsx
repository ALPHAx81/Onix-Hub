import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        if (roomCode.trim()) {
            setIsLoading(true);
            // Add a small delay for smooth transition
            setTimeout(() => {
                navigate(`/room/${roomCode.trim()}`);
            }, 300);
        }
    };

    return (
        <div className="home-page">

            <form onSubmit={handleFormSubmit} className="form">
                <div className="form-group">
                    <h1>ONIX HUB </h1>
                    <p>Connect with anyone, anywhere. Enter a room code to join or create a new virtualparty spot</p>
                    
                    <div className="form-field">
                        <label htmlFor="roomCode">
                            Room Code
                        </label>
                        <input 
                            id="roomCode"
                            value={roomCode} 
                            onChange={(e) => setRoomCode(e.target.value)}
                            type="text" 
                            required 
                            placeholder="Enter room code..."
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="form-button">
                        <button 
                            type="submit" 
                            disabled={isLoading || !roomCode.trim()}
                        >
                            {isLoading ? 'Joining...' : 'Join Room'}
                        </button>
                    </div>
                </div>
            </form>
        </div>  
    );
};

export default HomePage;