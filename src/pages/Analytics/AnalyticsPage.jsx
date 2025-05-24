
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  fetchCategoryAnalytics,
  fetchSubmissionAnalytics,
  fetchMostVotedAnalytics,
} from '../../redux/actions/analyticsActions';
import {
  AnalyticsContainer,
  AnalyticsSection,
  AnalyticsTitle,
  AnalyticsChartContainer,
  AnalyticsTable,
} from '../../components/analytics/AnalyticsStyles';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { 
    categories, 
    submissions, 
    mostVoted, 
    loading, 
    error 
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchCategoryAnalytics());
    dispatch(fetchSubmissionAnalytics());
    dispatch(fetchMostVotedAnalytics());
  }, [dispatch]);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  const categoryData = {
  labels: categories.map((c) => c.category),
    datasets: [
      {
        label: 'Issues by Category',
        data : categories.map((c) => c.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const submissionData = {
  labels: submissions.map((s) => s.date),
    datasets: [
      {
        label: 'Daily Submissions',
     data : submissions.map((s) => s.count),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <AnalyticsContainer>
       <AnalyticsSection>
  <AnalyticsTitle>Issues by Category</AnalyticsTitle>
  <AnalyticsChartContainer>
    <Bar
      data={categoryData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Issues by Category',
          },
        },
      }}
    />
  </AnalyticsChartContainer>
</AnalyticsSection>

       <AnalyticsSection>
         <AnalyticsTitle>Daily Submissions (Last 7 Days)</AnalyticsTitle>
        <AnalyticsChartContainer>
           <Line data={submissionData} />
         </AnalyticsChartContainer>
      </AnalyticsSection>

       <AnalyticsSection>
         <AnalyticsTitle>Most Voted Issues</AnalyticsTitle>
        <AnalyticsTable>
           <thead>
             <tr>
               <th>Category</th>
               <th>Title</th>
               <th>Votes</th>
               <th>Status</th>
             </tr>
           </thead>
           <tbody>
             {mostVoted.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.category}</td>
                <td>{issue.title}</td>
                <td>{issue.votes}</td>
                <td>{issue.status}</td>
              </tr>
            ))}
          </tbody>
        </AnalyticsTable>
      </AnalyticsSection>
    </AnalyticsContainer>
  );
};

export default AnalyticsPage;


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import {
//   fetchCategoryAnalytics,
//   fetchSubmissionAnalytics,
//   fetchMostVotedAnalytics,
// } from '../../features/analyticsSlice';
// import {
//   AnalyticsContainer,
//   AnalyticsSection,
//   AnalyticsTitle,
//   AnalyticsChartContainer,
//   AnalyticsTable,
// } from '../../components/analytics/AnalyticsStyles';

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AnalyticsPage = () => {
//   const dispatch = useDispatch();
//   const { categories, submissions, mostVoted, status } = useSelector(
//     (state) => state.analytics
//   );

//   useEffect(() => {
//     dispatch(fetchCategoryAnalytics());
//     dispatch(fetchSubmissionAnalytics());
//     dispatch(fetchMostVotedAnalytics());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading analytics...</div>;
//   }

//   const categoryData = {
//     labels: categories.map((item) => item._id),
//     datasets: [
//       {
//         label: 'Issues by Category',
//         data: categories.map((item) => item.count),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.7)',
//           'rgba(54, 162, 235, 0.7)',
//           'rgba(255, 206, 86, 0.7)',
//           'rgba(75, 192, 192, 0.7)',
//           'rgba(153, 102, 255, 0.7)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const submissionData = {
//     labels: submissions.map((item) => item._id),
//     datasets: [
//       {
//         label: 'Daily Submissions',
//         data: submissions.map((item) => item.count),
//         fill: false,
//         backgroundColor: 'rgba(75, 192, 192, 0.7)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <AnalyticsContainer>
//       <AnalyticsSection>
//         <AnalyticsTitle>Issues by Category</AnalyticsTitle>
//         <AnalyticsChartContainer>
//           <Pie data={categoryData} />
//         </AnalyticsChartContainer>
//       </AnalyticsSection>

//       <AnalyticsSection>
//         <AnalyticsTitle>Daily Submissions (Last 7 Days)</AnalyticsTitle>
//         <AnalyticsChartContainer>
//           <Line data={submissionData} />
//         </AnalyticsChartContainer>
//       </AnalyticsSection>

//       <AnalyticsSection>
//         <AnalyticsTitle>Most Voted Issues</AnalyticsTitle>
//         <AnalyticsTable>
//           <thead>
//             <tr>
//               <th>Category</th>
//               <th>Title</th>
//               <th>Votes</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mostVoted.map((issue) => (
//               <tr key={issue._id}>
//                 <td>{issue.category}</td>
//                 <td>{issue.title}</td>
//                 <td>{issue.votes}</td>
//                 <td>{issue.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </AnalyticsTable>
//       </AnalyticsSection>
//     </AnalyticsContainer>
//   );
// };

// export default AnalyticsPage;