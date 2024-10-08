import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage'
import Test from './pages/Test'
import TestFinish from './pages/TestFinish'
import PostManagement from './pages/PostManagement';
import SentApplications from './pages/SentApplications';
import ReceivedApplications from './pages/ReceivedApplications';
import FindTutor from './pages/FindTutor';
import TutorDetail from './pages/TutorDetail';
import MyDetail from './pages/MyDetail';
import CreateMyClass from './pages/CreateMyClass';
import ScrollToTop from './ScrollToTop';
const App = () => {
  return (
    <>
    <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<MainPage/>} />
        <Route path="/test" element={<Test />} />
        <Route path="/testfinish" element={<TestFinish />} />
        <Route path="/findtutor" element={<FindTutor />} />
        <Route path="/tutordetail/:tutorId" element={<TutorDetail/>} />
        <Route path="/mydetail/:tutorid" element={<MyDetail/>} />
        <Route path='/postmanagement/:user_id' element={<PostManagement />} />
        <Route path='/createmyclass/:user_id' element={<CreateMyClass/>} />
        <Route path='/sentapplications/:user_id' element={<SentApplications />} />
        <Route path='/receivedapplications/:user_id' element={<ReceivedApplications/>} />
      </Routes>

    
    </>
  )
}

export default App