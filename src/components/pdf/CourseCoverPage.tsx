import React from 'react';

export interface CourseCoverPageData {
  universityName: string;
  department: string;

  courseTitle: string;
  courseCode: string;
  semester?: string;
  academicYear?: string;

  packageType: 'Course' | 'Semester' | 'Lab Manual' | 'Module';
  packageDescription?: string;

  documentId?: string;
  documentSubtitle?: string;

  footerText?: string;
}

interface Props {
  data: CourseCoverPageData;
}

export default function CourseCoverPage({ data }: Props) {
  // Collect optional identifiers
  const identifiers = [
    data.semester,
    data.academicYear,
    data.documentId,
    data.documentSubtitle,
    data.packageDescription,
  ].filter(Boolean) as string[];

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
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* 1. Logo */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src="/logo.png"
          alt="University Logo"
          style={{
            maxWidth: '220px',
            maxHeight: '48px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>

      {/* 2. Header banner */}
      <div style={{ width: '100%', marginBottom: '80px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '0 0 16px 0' }} />
        <div style={{ fontFamily: 'serif', fontSize: '24px', textTransform: 'uppercase', marginBottom: '8px', color: '#000' }}>
          {data.universityName}
        </div>
        <div style={{ fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', color: '#444' }}>
          {data.department}
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '16px 0 0 0' }} />
      </div>

      {/* 3. Course-level heading */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '20px', marginBottom: '8px', color: '#333' }}>
          {data.packageType} on
        </div>
        <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#000', lineHeight: 1.2 }}>
          {data.courseTitle}
        </div>
        {data.courseCode && (
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#222' }}>
            {data.courseCode}
          </div>
        )}
      </div>

      {/* 4. Optional identifiers */}
      {identifiers.length > 0 && (
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {identifiers.map((text, idx) => (
            <div key={idx} style={{ fontSize: '16px', color: '#555' }}>
              {text}
            </div>
          ))}
        </div>
      )}

      {/* 5. Optional footer */}
      <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
        {data.footerText && (
          <div style={{ fontSize: '12px', color: '#777' }}>
            {data.footerText}
          </div>
        )}
      </div>
    </div>
  );
}
