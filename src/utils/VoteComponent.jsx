import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VoteComponent() {

    const db = getFirestore();
    const [votes, setVotes] = useState({ activity1: 0, activity2: 0, activity3: 0 });
    const [userVote, setUserVote] = useState(null);
    const { user } = useAuth();
    
		const fetchVotes = async () => {
            const docRef = doc(db, 'votes', 'picnicActivities');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setVotes(docSnap.data());
            } else {
                await setDoc(docRef, { activity1: 0, activity2: 0, activity3: 0 });
            }
        };

    const fetchUserVote = async () => {
        if (user) {
            const userVoteRef = doc(db, 'userVotes', user.uid);
            const userVoteSnap = await getDoc(userVoteRef);
            if (userVoteSnap.exists()) {
                setUserVote(userVoteSnap.data().vote);
            }
        }
    };
    useEffect(() => {
        fetchVotes();
        fetchUserVote();
    }, [user]);

    const handleVote = async (activity) => {
        if (!user || userVote === activity) return;

        const docRef = doc(db, 'votes', 'picnicActivities');
        const userVoteRef = doc(db, 'userVotes', user.uid);

        if (userVote) {
            await updateDoc(docRef, { [userVote]: votes[userVote] - 1 });
        }

        await updateDoc(docRef, { [activity]: votes[activity] + 1 });
        await setDoc(userVoteRef, { vote: activity });
        
        setUserVote(activity);
        setVotes((prevVotes) => ({
            ...prevVotes,
            [userVote]: userVote && userVote !== activity ? prevVotes[userVote] - 1 : prevVotes[userVote],
            [activity]: prevVotes[activity] + 1,
        }));
    };

    const data = {
        labels: ['Activity 1', 'Activity 2', 'Activity 3'],
        datasets: [
            {
                label: 'Votes',
                data: [votes.activity1, votes.activity2, votes.activity3],
            },
        ],
    };

    return (
        <div className="">
            <h2 className="mb-2">Vote for an Activity</h2>
            <div className="flex gap-2 mb-4">   
                <button
                    onClick={() => handleVote('activity1')}
                    disabled={!user}
                    className={`py-2 px-4 ${
                        userVote === 'activity1' ? '' : ''
                    } ${!user ? '' : ''}`}
                >
                    Activity 1
                </button>
                <button
                    onClick={() => handleVote('activity2')}
                    disabled={!user}
                    className={`py-2 px-4 ${
                        userVote === 'activity2' ? '' : ''
                    } ${!user ? '' : ''}`}
                >
                    Activity 2
                </button>
                <button
                    onClick={() => handleVote('activity3')}
                    disabled={!user}
                    className={`py-2 px-4 ${
                        userVote === 'activity3' ? '' : ''
                    } ${!user ? '' : ''}`}
                >
                    Activity 3
                </button>
            </div>
            <Bar data={data} />
            {userVote && <p className="mt-2">You have voted for {userVote.replace('activity', 'Activity ')}.</p>}
        </div>
    );
}

export default VoteComponent;
