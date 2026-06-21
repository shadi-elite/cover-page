import React from 'react';
import AssignmentCoverPage from '@/components/pdf/AssignmentCoverPage';
import CourseCoverPage from '@/components/pdf/CourseCoverPage';

export default function PreviewPage() {
  const assignmentData = {
    courseTitle: 'Object-Oriented Programming',
    courseCode: 'CSE-212',
    assignmentNo: '01',
    assignmentTitle: 'Introduction to Classes and Objects',
    studentName: 'John Doe',
    studentId: '2019100000001',
    section: 'A',
    semester: '4th Semester',
    department: 'Computer Science and Engineering',
    facultyName: 'Jane Smith',
    designation: 'Lecturer',
    facultyDepartment: 'Computer Science and Engineering',
    submissionDate: '22 June 2026',
  };

  const courseData = {
    universityName: 'Northern University of Business and Technology | Khulna',
    department: 'Department of Computer Science and Engineering',
    courseTitle: 'Object-Oriented Programming Laboratory',
    courseCode: 'CSE-212',
    semester: '2nd Year, 1st Semester',
    academicYear: '2025-2026',
    packageType: 'Course' as const,
    packageDescription: 'All experiments and reports',
    documentId: 'Version 1.0',
    documentSubtitle: 'Student Copy',
    footerText: 'Confidential — For Internal Academic Use Only',
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#e5e5e5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '24px', fontWeight: 'bold' }}>
        PDF Template Previews
      </h1>

      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Assignment Cover Page</h2>
          <div style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)', backgroundColor: 'white' }}>
            <AssignmentCoverPage data={assignmentData} />
          </div>
        </div>

        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Course/Semester Cover Page</h2>
          <div style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)', backgroundColor: 'white' }}>
            <CourseCoverPage data={courseData} />
          </div>
        </div>
      </div>
    </div>
  );
}
