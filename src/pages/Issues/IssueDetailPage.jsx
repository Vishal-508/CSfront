import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchIssueById, clearCurrentIssue } from '../../redux/actions/issueActions';
import { castVote, checkUserVote } from '../../redux/actions/voteActions';
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
} from '../../components/issues/DetailStyles';

const IssueDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentIssue, loading: issueLoading, error: issueError } = useSelector(
    (state) => state.issues
  );
  const { votedIssues, loading: voteLoading } = useSelector(
    (state) => state.votes
  );
  const { user } = useSelector((state) => state.auth);

  const hasVoted = votedIssues.includes(id);

  useEffect(() => {
    dispatch(fetchIssueById(id));
    if (user) {
      dispatch(checkUserVote(id));
    }

    return () => {
      dispatch(clearCurrentIssue());
    };
  }, [id, dispatch, user]);

  const handleVote = async () => {
    if (!user) {
      toast.error('You need to login to vote');
      return;
    }
    if (hasVoted) {
      toast('You have already voted on this issue');
      return;
    }
    try {
      await dispatch(castVote(id));
      toast.success('Vote counted!');
    } catch (error) {
      toast.error(error.message || 'Failed to vote');
    }
  };

  if (issueLoading) return <div>Loading...</div>;
  if (issueError) return <div>Error: {issueError}</div>;
  if (!currentIssue) return <div>Issue not found</div>;
console.log("data detail page",currentIssue)
  return (
      <DetailContainer>
      <DetailBackButton onClick={() => navigate(-1)}>← Back</DetailBackButton>
      
      <DetailHeader>
        <DetailTitle>{currentIssue.title}</DetailTitle>
        <DetailMeta>
          <span>{currentIssue.category}</span>
          <span>{currentIssue.location}</span>
          <span>{new Date(currentIssue.createdAt).toLocaleDateString()}</span>
        </DetailMeta>
      </DetailHeader>

      <DetailContent>
        {currentIssue.image && (
          <DetailImage
            src={currentIssue.image}
            alt={currentIssue.title}
          />
        )}
        <DetailInfo>
          <DetailDescription>{currentIssue.description}</DetailDescription>
          <div>
            <span>Status: {currentIssue.status}</span>
            <span>Votes: {currentIssue.votes}</span>
          </div>
          <DetailVoteButton
            onClick={handleVote}
            disabled={hasVoted}
          >
            {hasVoted ? 'Voted ✔' : 'Vote for this issue'}
          </DetailVoteButton>
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
// import { fetchIssueById, clearCurrentIssue } from '../../features/issueSlice';
// import { voteOnIssue, checkUserVote } from '../../features/voteSlice';
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
// } from '../../components/issues/IssueStyles';

// const IssueDetailPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { currentIssue } = useSelector((state) => state.issues);
//   const { votedIssues } = useSelector((state) => state.votes);
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
//       await dispatch(voteOnIssue(id)).unwrap();
//       toast.success('Vote counted!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to vote');
//     }
//   };

//   if (!currentIssue) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <DetailContainer>
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
//             src={`${import.meta.env.VITE_API_URL}/${currentIssue.image}`}
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