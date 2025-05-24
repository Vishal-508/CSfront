import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIssues, fetchUserIssues, fetchIssueById } from '../../features/issueSlice';
import {
  DashboardContainer,
  DashboardCard,
  DashboardCardTitle,
  DashboardCardContent,
  DashboardStat,
  DashboardRecentIssues,
  DashboardIssueItem,
} from '../../components/dashboard/DashboardStyles';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issues, userIssues = [], pagination } = useSelector((state) => state.issues);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchIssues({ page: 1, limit: 5, sort: -1 }));
    dispatch(fetchUserIssues());
  }, [dispatch]);

  const handleViewIssue = (id) => {
    dispatch(fetchIssueById(id));
    navigate(`/issues/${id}`);
  };

  const pendingUserIssues = userIssues?.filter((issue) => issue?.status === 'Pending').length;

  return (
    <DashboardContainer>
      <h1>Welcome, {user?.name || 'User'}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <DashboardCard>
          <DashboardCardTitle>Total Issues Reported</DashboardCardTitle>
          <DashboardCardContent>
            <DashboardStat>{pagination.totalItems}</DashboardStat>
          </DashboardCardContent>
        </DashboardCard>

        <DashboardCard>
          <DashboardCardTitle>Your Reported Issues</DashboardCardTitle>
          <DashboardCardContent>
            <DashboardStat>{userIssues?.length}</DashboardStat>
          </DashboardCardContent>
        </DashboardCard>

        <DashboardCard>
          <DashboardCardTitle>Your Pending Issues</DashboardCardTitle>
          <DashboardCardContent>
            <DashboardStat>{pendingUserIssues}</DashboardStat>
          </DashboardCardContent>
        </DashboardCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <DashboardCard>
          <DashboardCardTitle>Recent Issues</DashboardCardTitle>
          <DashboardCardContent>
            <DashboardRecentIssues>
              {issues?.slice(0, 5).map((issue) => (
                <DashboardIssueItem key={issue._id} onClick={() => handleViewIssue(issue._id)} style={{ cursor: 'pointer' }}>
                  <span>{issue.title}</span>
                  <span>{issue.status}</span>
                </DashboardIssueItem>
              ))}
            </DashboardRecentIssues>
          </DashboardCardContent>
        </DashboardCard>

        <DashboardCard>
          <DashboardCardTitle>Your Recent Issues</DashboardCardTitle>
          <DashboardCardContent>
            <DashboardRecentIssues>
              {userIssues?.slice(0, 5).map((issue) => (
                <DashboardIssueItem key={issue._id} onClick={() => handleViewIssue(issue._id)} style={{ cursor: 'pointer' }}>
                  <span>{issue.title}</span>
                  <span>{issue.status}</span>
                </DashboardIssueItem>
              ))}
            </DashboardRecentIssues>
          </DashboardCardContent>
        </DashboardCard>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button style={{ padding: '10px 20px' }} onClick={() => navigate('/issues')}>View All Issues</button>
        <button 
  style={{ padding: '10px 20px' }} 
  onClick={() => navigate('/issues/new')}
>
  Report New Issue
</button>
      </div>
    </DashboardContainer>
  );
};

export default DashboardPage;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import {
//   fetchIssues,
//   fetchUserIssues,
// } from '../../features/issueSlice';
// import {
//   DashboardContainer,
//   DashboardCard,
//   DashboardCardTitle,
//   DashboardCardContent,
//   DashboardStat,
//   DashboardRecentIssues,
//   DashboardIssueItem,
// } from '../../components/dashboard/DashboardStyles';

// const DashboardPage = () => {
//   const dispatch = useDispatch();
//   const { issues, userIssues=[], pagination } = useSelector(
//     (state) => state.issues
//   );
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchIssues({ page: 1, limit: 5, sort: 1 }));
//     dispatch(fetchUserIssues());
//   }, [dispatch]);

//   const pendingUserIssues = userIssues?.filter(
//     (issue) => issue?.status === 'Pending'
//   ).length;
// console.log("issue list ",issues)
//   return (
//     <DashboardContainer>
//       <h1>Welcome, {user?.name || 'User'}</h1>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
//         <DashboardCard>
//           <DashboardCardTitle>Total Issues Reported</DashboardCardTitle>
//           <DashboardCardContent>
//             <DashboardStat>{pagination.totalItems}</DashboardStat>
//           </DashboardCardContent>
//         </DashboardCard>

//         <DashboardCard>
//           <DashboardCardTitle>Your Reported Issues</DashboardCardTitle>
//           <DashboardCardContent>
//             <DashboardStat>{userIssues?.length}</DashboardStat>
//           </DashboardCardContent>
//         </DashboardCard>

//         <DashboardCard>
//           <DashboardCardTitle>Your Pending Issues</DashboardCardTitle>
//           <DashboardCardContent>
//             <DashboardStat>{pendingUserIssues}</DashboardStat>
//           </DashboardCardContent>
//         </DashboardCard>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
//         <DashboardCard>
//           <DashboardCardTitle>Recent Issues</DashboardCardTitle>
//           <DashboardCardContent>
//             <DashboardRecentIssues>
//               {issues?.slice(0, 5).map((issue) => (
//                 <DashboardIssueItem key={issue._id}>
//                   <Link to={`/issues/${issue._id}`}>{issue.title}</Link>
//                   <span>{issue.status}</span>
//                 </DashboardIssueItem>
//               ))}
//             </DashboardRecentIssues>
//           </DashboardCardContent>
//         </DashboardCard>

//         <DashboardCard>
//           <DashboardCardTitle>Your Recent Issues</DashboardCardTitle>
//           <DashboardCardContent>
//             <DashboardRecentIssues>
//               {userIssues?.slice(0, 5).map((issue) => (
//                 <DashboardIssueItem key={issue._id}>
//                   <Link to={`/issues/${issue._id}`}>{issue.title}</Link>
//                   <span>{issue.status}</span>
//                 </DashboardIssueItem>
//               ))}
//             </DashboardRecentIssues>
//           </DashboardCardContent>
//         </DashboardCard>
//       </div>

//       <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
//         <Link to="/issues" style={{ textDecoration: 'none' }}>
//           <button style={{ padding: '10px 20px' }}>View All Issues</button>
//         </Link>
//         <Link to="/issues/new" style={{ textDecoration: 'none' }}>
//           <button style={{ padding: '10px 20px' }}>Report New Issue</button>
//         </Link>
//       </div>
//     </DashboardContainer>
//   );
// };

// export default DashboardPage;