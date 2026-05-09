"use client";

import React, { forwardRef } from 'react';

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div 
      ref={ref} 
      className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl shrink-0 p-12 mx-auto relative"
      style={{ boxSizing: "border-box" }}
    >
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-1 text-gray-900">John Doe</h1>
        <p className="text-lg text-accent font-medium mb-3">Senior Software Engineer</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <span>john.doe@example.com</span>
          <span>•</span>
          <span>+1 (555) 123-4567</span>
          <span>•</span>
          <span>San Francisco, CA</span>
          <span>•</span>
          <span>linkedin.com/in/johndoe</span>
        </div>
        <div className="h-0.5 bg-gray-900 w-full mb-6"></div>
      </header>

      {/* Summary Section */}
      <section className="mb-6">
        <p className="text-sm text-gray-800 leading-relaxed">
          Results-oriented Senior Software Engineer with over 5 years of experience building highly scalable web applications, optimizing performance, and leading cross-functional teams. Proven track record of improving system efficiency by 40% and delivering projects ahead of schedule.
        </p>
      </section>

      {/* Experience Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">Professional Experience</h2>
        <div className="h-px bg-gray-300 w-full mb-4"></div>
        
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-base font-semibold text-gray-900">Senior Software Engineer</h3>
            <span className="text-sm font-medium text-gray-600">Jan 2021 – Present</span>
          </div>
          <div className="text-sm text-accent font-medium mb-2">TechNova Solutions, San Francisco, CA</div>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 ml-1">
            <li>Architected and migrated a monolithic legacy application to a microservices architecture using Node.js and Docker, improving system uptime to 99.99%.</li>
            <li>Led a team of 4 frontend engineers to rebuild the customer dashboard in React and Next.js, reducing load times by 60%.</li>
            <li>Implemented an AI-driven recommendation engine that increased user engagement by 25% within the first quarter.</li>
          </ul>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">Technical Skills</h2>
        <div className="h-px bg-gray-300 w-full mb-4"></div>
        <div className="text-sm text-gray-800">
          <p className="mb-1"><span className="font-semibold text-gray-900">Languages:</span> JavaScript, TypeScript, Python, SQL, HTML5, CSS3</p>
          <p className="mb-1"><span className="font-semibold text-gray-900">Frameworks:</span> React, Next.js, Node.js, Express, Tailwind CSS</p>
          <p><span className="font-semibold text-gray-900">Tools & Cloud:</span> Git, Docker, AWS (S3, EC2, Lambda), PostgreSQL, MongoDB</p>
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">Education</h2>
        <div className="h-px bg-gray-300 w-full mb-4"></div>
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-base font-semibold text-gray-900">Bachelor of Science in Computer Science</h3>
            <span className="text-sm font-medium text-gray-600">May 2019</span>
          </div>
          <div className="text-sm text-gray-800">University of California, Berkeley</div>
        </div>
      </section>

    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
