import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapIssues } from '../../redux/actions/mapActions'; // Updated import
import {
  MapWrapper,
  MapLoading,
  MapError,
  MapControlPanel,
} from '../../components/map/MapStyles';
import 'leaflet/dist/leaflet.css';

// ... (rest of your imports and icon setup)

const MapPage = () => {
  const dispatch = useDispatch();
  const { issues, loading, error } = useSelector((state) => state.map); // Updated to use loading instead of status
  const [center, setCenter] = useState([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    dispatch(fetchMapIssues());
  }, [dispatch]);

  if (loading) {
    return <MapLoading>Loading map data...</MapLoading>;
  }

  if (error) {
    return <MapError>{error}</MapError>;
  }

  // ... (rest of your component code)
};

export default MapPage;




// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMapIssues } from '../../features/mapSlice';
// import {
//   MapWrapper,
//   MapLoading,
//   MapError,
//   MapControlPanel,
// } from '../../components/map/MapStyles';
// import 'leaflet/dist/leaflet.css';

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const getStatusColor = (status) => {
//   switch (status) {
//     case 'Pending':
//       return 'red';
//     case 'In Progress':
//       return 'orange';
//     case 'Resolved':
//       return 'green';
//     default:
//       return 'blue';
//   }
// };

// const MapPage = () => {
//   const dispatch = useDispatch();
//   const { issues, status, error } = useSelector((state) => state.map);
//   const [center, setCenter] = useState([20.5937, 78.9629]); // Default to India center
//   const [zoom, setZoom] = useState(5);

//   useEffect(() => {
//     dispatch(fetchMapIssues());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <MapLoading>Loading map data...</MapLoading>;
//   }

//   if (error) {
//     return <MapError>{error}</MapError>;
//   }

//   return (
//     <MapWrapper>
//       <MapControlPanel>
//         <h2>Reported Issues Map</h2>
//         <p>Total issues: {issues.length}</p>
//         <div>
//           <span style={{ color: 'red' }}>● Pending</span>
//           <span style={{ color: 'orange' }}>● In Progress</span>
//           <span style={{ color: 'green' }}>● Resolved</span>
//         </div>
//       </MapControlPanel>

//       <MapContainer
//         center={center}
//         zoom={zoom}
//         style={{ height: '100%', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {issues.map((issue) => (
//           <Marker
//             key={issue._id}
//             position={[issue.location.lat, issue.location.lng]}
//             icon={L.divIcon({
//               className: 'custom-icon',
//               html: `<div style="background-color: ${getStatusColor(
//                 issue.status
//               )}; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${issue.votes}</div>`,
//             })}
//           >
//             <Popup>
//               <h3>{issue.title}</h3>
//               <p>Category: {issue.category}</p>
//               <p>Status: {issue.status}</p>
//               <p>Votes: {issue.votes}</p>
//               <p>Reported: {new Date(issue.createdAt).toLocaleDateString()}</p>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </MapWrapper>
//   );
// };

// export default MapPage;