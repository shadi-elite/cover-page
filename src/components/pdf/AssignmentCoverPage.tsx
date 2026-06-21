import React from 'react';

export interface AssignmentCoverPageData {
  courseTitle: string;
  courseCode: string;
  assignmentNo?: string;
  assignmentTitle: string;

  studentName: string;
  studentId: string;
  section: string;
  semester: string;
  department?: string;

  facultyName: string;
  designation?: string;
  facultyDepartment?: string;
  submissionDate: string;
}

interface Props {
  data: AssignmentCoverPageData;
}

export default function AssignmentCoverPage({ data }: Props) {
  return (
    <div
      style={{
        width: '794px',
        height: '1123px',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'sans-serif',
        padding: '60px 80px',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Logo */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img
          src="/logo.png"
          alt="University Logo"
          style={{
            maxWidth: '220px',
            maxHeight: '48px',
            objectFit: 'contain',
            display: 'inline-block',
          }}
        />
      </div>

      {/* 2. Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '0 0 20px 0' }} />
        <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', color: '#333' }}>
          Assignment on
        </div>
        <div style={{ fontFamily: 'serif', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
          {data.assignmentTitle}
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '0' }} />
      </div>

      {/* Shared row style for labels and values */}
      <style>
        {`
          .pdf-row {
            display: flex;
            margin-bottom: 8px;
            font-size: 16px;
            line-height: 1.4;
          }
          .pdf-label {
            width: 160px;
            color: #555;
            flex-shrink: 0;
          }
          .pdf-value {
            color: #000;
            font-weight: 500;
            flex-grow: 1;
          }
          .pdf-section-title {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #000;
            margin-bottom: 16px;
          }
          .pdf-section {
            margin-bottom: 40px;
          }
        `}
      </style>

      {/* 3. Course Information */}
      <div className="pdf-section">
        <div className="pdf-section-title">Course Information</div>
        <div className="pdf-row">
          <div className="pdf-label">Course title</div>
          <div className="pdf-value">{data.courseTitle}</div>
        </div>
        <div className="pdf-row">
          <div className="pdf-label">Course code</div>
          <div className="pdf-value">{data.courseCode}</div>
        </div>
        {data.assignmentNo && (
          <div className="pdf-row">
            <div className="pdf-label">Assignment no.</div>
            <div className="pdf-value">{data.assignmentNo}</div>
          </div>
        )}
      </div>

      {/* 4. Student Information */}
      <div className="pdf-section" style={{ borderTop: '1px solid #ddd', paddingTop: '30px' }}>
        <div className="pdf-section-title">Submitted By</div>
        <div className="pdf-row">
          <div className="pdf-label">Student name</div>
          <div className="pdf-value">{data.studentName}</div>
        </div>
        <div className="pdf-row">
          <div className="pdf-label">Student ID</div>
          <div className="pdf-value">{data.studentId}</div>
        </div>
        <div className="pdf-row">
          <div className="pdf-label">Section</div>
          <div className="pdf-value">{data.section}</div>
        </div>
        <div className="pdf-row">
          <div className="pdf-label">Semester</div>
          <div className="pdf-value">{data.semester}</div>
        </div>
        {data.department && (
          <div className="pdf-row">
            <div className="pdf-label">Department</div>
            <div className="pdf-value">{data.department}</div>
          </div>
        )}
      </div>

      {/* 5. Submission Details */}
      <div className="pdf-section" style={{ borderTop: '1px solid #ddd', paddingTop: '30px', flexGrow: 1 }}>
        <div className="pdf-section-title">Submitted To</div>
        <div className="pdf-row">
          <div className="pdf-label">Faculty name</div>
          <div className="pdf-value">{data.facultyName}</div>
        </div>
        {data.designation && (
          <div className="pdf-row">
            <div className="pdf-label">Designation</div>
            <div className="pdf-value">{data.designation}</div>
          </div>
        )}
        {data.facultyDepartment && (
          <div className="pdf-row">
            <div className="pdf-label">Department</div>
            <div className="pdf-value">{data.facultyDepartment}</div>
          </div>
        )}
        <div className="pdf-row" style={{ marginTop: '16px' }}>
          <div className="pdf-label">Date of submission</div>
          <div className="pdf-value">{data.submissionDate}</div>
        </div>
      </div>
    </div>
  );
}
