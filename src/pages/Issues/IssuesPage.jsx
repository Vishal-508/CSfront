import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  fetchIssues, 
  fetchUserIssues, 
  fetchIssueById,
  deleteIssue
} from '../../redux/actions/issueActions';
import {
  IssuesContainer,
  IssuesHeader,
  IssuesTabs,
  IssuesTab,
  IssuesContent,
  IssueCard,
  IssueImage,
  IssueDetails,
  IssueTitle,
  IssueMeta,
  IssueStatus,
  IssueVotes,
  IssueActions,
  IssueButton,
  SearchBar,
  FilterBar,
  Pagination,
} from '../../components/issues/IssueStyles';

const IssuesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('public');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    sort: -1,
  });
  const [page, setPage] = useState(1);

const { 
  issues = [], 
  userIssues = [], 
  pagination = { totalPages: 0 }, 
  loading, 
  error 
} = useSelector((state) => state.issues);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (activeTab === 'public') {
      const params = {
        page,
        search: searchTerm,
        category: filters.category,
        status: filters.status,
        sort: filters.sort,
      };
      dispatch(fetchIssues(params));
    } else {
      dispatch(fetchUserIssues());
    }
  }, [activeTab, page, searchTerm, filters, dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleViewIssue = (id) => {
    dispatch(fetchIssueById(id));
    navigate(`/issues/${id}`);
  };

  const handleDeleteIssue = async (id) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await dispatch(deleteIssue(id));
        toast.success('Issue deleted successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to delete issue');
      }
    }
  };

  const displayedIssues = activeTab === 'public' ? issues : userIssues;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
        <IssuesContainer>
      <IssuesHeader>
        <h1>{activeTab === 'public' ? 'Public Issues' : 'My Issues'}</h1>
        {activeTab === 'public' && (
          <SearchBar
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={handleSearch}
          />
        )}
      </IssuesHeader>

      <IssuesTabs>
        <IssuesTab
          active={activeTab === 'public'}
          onClick={() => setActiveTab('public')}
        >
          Public Issues
        </IssuesTab>
        <IssuesTab
          active={activeTab === 'my-issues'}
          onClick={() => setActiveTab('my-issues')}
        >
          My Issues
        </IssuesTab>
      </IssuesTabs>

      {activeTab === 'public' && (
        <FilterBar>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select name="sort" value={filters.sort} onChange={handleFilterChange}>
            <option value="-1">Newest First</option>
            <option value="1">Most Voted</option>
          </select>
        </FilterBar>
      )}

      <IssuesContent>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : displayedIssues.length === 0 ? (
          <p>No issues found</p>
        ) : (
          displayedIssues.map((issue) => (
            <IssueCard key={issue._id}>
                {console.log("issue.image",issue.status)}
              {issue.imageUrl && (
                <IssueImage
                  src={issue.imageUrl}
                  alt={issue.title}
                />
              )}
              <IssueDetails>
                <IssueTitle onClick={() => handleViewIssue(issue._id)}>
                  {issue.title}
                </IssueTitle>
                <IssueMeta>
                  <span>{issue.category}</span>
                  <span>{issue.location}</span>
                  <IssueStatus status={issue.status.toLowerCase()}>
                    {issue.status}
                  </IssueStatus>
                </IssueMeta>
                <IssueVotes>
                  <span>{issue.voteCount} votes</span>
                  <span>
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </span>
                </IssueVotes>
                { issue.status === 'Pending' && (
                  <IssueActions>
                    <IssueButton
                      onClick={() => navigate(`/issues/edit/${issue._id}`)}
                    >
                      Edit
                    </IssueButton>
                    <IssueButton
                      danger
                      onClick={() => dispatch(deleteIssue(issue._id))}
                    >
                      Delete
                    </IssueButton>
                  </IssueActions>
                )}
              </IssueDetails>
            </IssueCard>
          ))
        )}
      </IssuesContent>

      {activeTab === 'public' && pagination.totalPages > 1 && (
        <Pagination>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {pagination.totalPages}
          </span>
          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </Pagination>
      )}
    </IssuesContainer>
  );
};

export default IssuesPage;




// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { fetchIssues, fetchUserIssues, fetchIssueById } from '../../features/issueSlice';
// import {
//   IssuesContainer,
//   IssuesHeader,
//   IssuesTabs,
//   IssuesTab,
//   IssuesContent,
//   IssueCard,
//   IssueImage,
//   IssueDetails,
//   IssueTitle,
//   IssueMeta,
//   IssueStatus,
//   IssueVotes,
//   IssueActions,
//   IssueButton,
//   SearchBar,
//   FilterBar,
//   Pagination,
// } from '../../components/issues/IssueStyles';

// const IssuesPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('public');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     category: '',
//     status: '',
//     sort: 'newest',
//   });
//   const [page, setPage] = useState(1);

//   const { issues, userIssues, pagination, status } = useSelector(
//     (state) => state.issues
//   );
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (activeTab === 'public') {
//       const params = {
//         page,
//         search: searchTerm,
//         category: filters.category,
//         status: filters.status,
//         sort: filters.sort,
//       };
//       dispatch(fetchIssues(params));
//     } else {
//       dispatch(fetchUserIssues());
//     }
//   }, [activeTab, page, searchTerm, filters, dispatch]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(1);
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setPage(1);
//   };

//   const handleViewIssue = (id) => {
//     dispatch(fetchIssueById(id));
//     navigate(`/issues/${id}`);
//   };

//   const displayedIssues = activeTab === 'public' ? issues : userIssues;

//   return (
//     <IssuesContainer>
//       <IssuesHeader>
//         <h1>{activeTab === 'public' ? 'Public Issues' : 'My Issues'}</h1>
//         {activeTab === 'public' && (
//           <SearchBar
//             type="text"
//             placeholder="Search issues..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         )}
//       </IssuesHeader>

//       <IssuesTabs>
//         <IssuesTab
//           active={activeTab === 'public'}
//           onClick={() => setActiveTab('public')}
//         >
//           Public Issues
//         </IssuesTab>
//         <IssuesTab
//           active={activeTab === 'my-issues'}
//           onClick={() => setActiveTab('my-issues')}
//         >
//           My Issues
//         </IssuesTab>
//       </IssuesTabs>

//       {activeTab === 'public' && (
//         <FilterBar>
//           <select name="category" value={filters.category} onChange={handleFilterChange}>
//             <option value="">All Categories</option>
//             <option value="Road">Road</option>
//             <option value="Water">Water</option>
//             <option value="Sanitation">Sanitation</option>
//             <option value="Electricity">Electricity</option>
//             <option value="Other">Other</option>
//           </select>
//           <select name="status" value={filters.status} onChange={handleFilterChange}>
//             <option value="">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>
//           <select name="sort" value={filters.sort} onChange={handleFilterChange}>
//             <option value="newest">Newest First</option>
//             <option value="most-voted">Most Voted</option>
//           </select>
//         </FilterBar>
//       )}

//       <IssuesContent>
//         {status === 'loading' ? (
//           <p>Loading...</p>
//         ) : displayedIssues.length === 0 ? (
//           <p>No issues found</p>
//         ) : (
//           displayedIssues.map((issue) => (
//             <IssueCard key={issue._id}>
//               {issue.image && (
//                 <IssueImage
//                   src={`${import.meta.env.VITE_API_URL}/${issue.image}`}
//                   alt={issue.title}
//                 />
//               )}
//               <IssueDetails>
//                 <IssueTitle onClick={() => handleViewIssue(issue._id)}>
//                   {issue.title}
//                 </IssueTitle>
//                 <IssueMeta>
//                   <span>{issue.category}</span>
//                   <span>{issue.location}</span>
//                   <IssueStatus status={issue.status.toLowerCase()}>
//                     {issue.status}
//                   </IssueStatus>
//                 </IssueMeta>
//                 <IssueVotes>
//                   <span>{issue.votes} votes</span>
//                   <span>
//                     {new Date(issue.createdAt).toLocaleDateString()}
//                   </span>
//                 </IssueVotes>
//                 {activeTab === 'my-issues' && issue.status === 'Pending' && (
//                   <IssueActions>
//                     <IssueButton
//                       onClick={() => navigate(`/issues/edit/${issue._id}`)}
//                     >
//                       Edit
//                     </IssueButton>
//                     <IssueButton
//                       danger
//                       onClick={() => dispatch(deleteIssue(issue._id))}
//                     >
//                       Delete
//                     </IssueButton>
//                   </IssueActions>
//                 )}
//               </IssueDetails>
//             </IssueCard>
//           ))
//         )}
//       </IssuesContent>

//       {activeTab === 'public' && pagination.totalPages > 1 && (
//         <Pagination>
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//           >
//             Previous
//           </button>
//           <span>
//             Page {page} of {pagination.totalPages}
//           </span>
//           <button
//             disabled={page === pagination.totalPages}
//             onClick={() => setPage(page + 1)}
//           >
//             Next
//           </button>
//         </Pagination>
//       )}
//     </IssuesContainer>
//   );
// };

// export default IssuesPage;