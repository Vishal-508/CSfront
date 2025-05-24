import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchIssueById, clearCurrentIssue } from '../../redux/actions/issueActions';
import { castVote, checkUserVote, removeVote } from '../../redux/actions/voteActions';
import {
  DetailContainer,
  DetailHeader,
  DetailContent,
  DetailImage,
  DetailInfo,
  DetailTitle,
  DetailMeta,
  DetailDescription,
  DetailVoteButton,
  DetailBackButton,
  DetailStatusBadge,
  DetailVoteCount,
  DetailActionContainer,
  DetailLoading,
  DetailError
} from '../../components/issues/DetailStyles';

const IssueDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isProcessingVote, setIsProcessingVote] = useState(false);

  const { currentIssue, loading: issueLoading, error: issueError } = useSelector(
    (state) => state.issues
  );
  const { votedIssues, loading: voteLoading, error: voteError } = useSelector(
    (state) => state.votes
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Check if user has voted for this issue
  const hasVoted = votedIssues[id] === true;

  useEffect(() => {
    dispatch(fetchIssueById(id));
    if (isAuthenticated) {
      dispatch(checkUserVote(id));
    }

    return () => {
      dispatch(clearCurrentIssue());
    };
  }, [id, dispatch, isAuthenticated]);

  const handleVote = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to vote on issues');
      navigate('/auth', { state: { from: `/issues/${id}` } });
      return;
    }

    setIsProcessingVote(true);
    try {
      if (hasVoted) {
        await dispatch(removeVote(id));
        toast.success('Vote removed successfully');
      } else {
        await dispatch(castVote(id));
        toast.success('Thank you for voting!');
      }
      // Refresh issue data to get updated vote count
      await dispatch(fetchIssueById(id));
    } catch (error) {
      toast.error(error.message || 'Failed to process your vote');
    } finally {
      setIsProcessingVote(false);
    }
  };

  if (issueLoading) return <DetailLoading>Loading issue details...</DetailLoading>;
  if (issueError) return <DetailError>Error: {issueError}</DetailError>;
  if (!currentIssue) return <DetailError>Issue not found</DetailError>;
console.log("currentIssue.image",currentIssue.image)
  return (
    <DetailContainer>
      <DetailBackButton onClick={() => navigate(-1)}>← Back to Issues</DetailBackButton>
      
      <DetailHeader>
        <DetailTitle>{currentIssue.title}</DetailTitle>
        <DetailMeta>
          <span>{currentIssue.category}</span>
          <span>{currentIssue.location}</span>
          <span>{new Date(currentIssue.createdAt).toLocaleDateString()}</span>
          <DetailStatusBadge status={currentIssue.status}>
            {currentIssue.status}
          </DetailStatusBadge>
        </DetailMeta>
      </DetailHeader>

      <DetailContent>
        {currentIssue.image && (
            <img src={`${currentIssue.image}`} alt={currentIssue.title}
            onError={(e) => e.target.style.display = 'none'} />
        //   <DetailImage
        //     src={`${currentIssue.image}`}
        //     alt={currentIssue.title}
        //     onError={(e) => e.target.style.display = 'none'}
        //   />
        )}
        
        <DetailInfo>
          <DetailDescription>{currentIssue.description}</DetailDescription>
          
          <DetailActionContainer>
            <DetailVoteCount>
              {currentIssue.votes || 0} {currentIssue.votes === 1 ? 'vote' : 'votes'}
            </DetailVoteCount>
            
            <DetailVoteButton
              onClick={handleVote}
              disabled={voteLoading || isProcessingVote}
              voted={hasVoted}
            >
              {isProcessingVote ? (
                'Processing...'
              ) : hasVoted ? (
                '✔ Voted'
              ) : (
                'Vote for this issue'
              )}
            </DetailVoteButton>
          </DetailActionContainer>
          
          {voteError && <DetailError>{voteError}</DetailError>}
        </DetailInfo>
      </DetailContent>
    </DetailContainer>
  );
};

export default IssueDetailPage;


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { fetchIssueById, clearCurrentIssue } from '../../redux/actions/issueActions';
// import { castVote, checkUserVote } from '../../redux/actions/voteActions';
// import {
//   DetailContainer,
//   DetailHeader,
//   DetailContent,
//   DetailImage,
//   DetailInfo,
//   DetailTitle,
//   DetailMeta,
//   DetailDescription,
//   DetailVoteButton,
//   DetailBackButton,
// } from '../../components/issues/DetailStyles';

// const IssueDetailPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { currentIssue, loading: issueLoading, error: issueError } = useSelector(
//     (state) => state.issues
//   );
//   const { votedIssues, loading: voteLoading } = useSelector(
//     (state) => state.votes
//   );
//   const { user } = useSelector((state) => state.auth);

//   const hasVoted = votedIssues.includes(id);

//   useEffect(() => {
//     dispatch(fetchIssueById(id));
//     if (user) {
//       dispatch(checkUserVote(id));
//     }

//     return () => {
//       dispatch(clearCurrentIssue());
//     };
//   }, [id, dispatch, user]);

//   const handleVote = async () => {
//     if (!user) {
//       toast.error('You need to login to vote');
//       return;
//     }
//     if (hasVoted) {
//       toast('You have already voted on this issue');
//       return;
//     }
//     try {
//       await dispatch(castVote(id));
//       toast.success('Vote counted!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to vote');
//     }
//   };

//   if (issueLoading) return <div>Loading...</div>;
//   if (issueError) return <div>Error: {issueError}</div>;
//   if (!currentIssue) return <div>Issue not found</div>;
// console.log("data detail page",currentIssue)
//   return (
//       <DetailContainer>
//       <DetailBackButton onClick={() => navigate(-1)}>← Back</DetailBackButton>
      
//       <DetailHeader>
//         <DetailTitle>{currentIssue.title}</DetailTitle>
//         <DetailMeta>
//           <span>{currentIssue.category}</span>
//           <span>{currentIssue.location}</span>
//           <span>{new Date(currentIssue.createdAt).toLocaleDateString()}</span>
//         </DetailMeta>
//       </DetailHeader>

//       <DetailContent>
//         {currentIssue.image && (
//           <DetailImage
//             src={currentIssue.image}
//             alt={currentIssue.title}
//           />
//         )}
//         <DetailInfo>
//           <DetailDescription>{currentIssue.description}</DetailDescription>
//           <div>
//             <span>Status: {currentIssue.status}</span>
//             <span>Votes: {currentIssue.votes}</span>
//           </div>
//           <DetailVoteButton
//             onClick={handleVote}
//             disabled={hasVoted}
//           >
//             {hasVoted ? 'Voted ✔' : 'Vote for this issue'}
//           </DetailVoteButton>
//         </DetailInfo>
//       </DetailContent>
//     </DetailContainer>
//   );
// };

// export default IssueDetailPage;


