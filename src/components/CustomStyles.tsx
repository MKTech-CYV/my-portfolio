"use client";

import React from 'react';

/**
 * CustomStyles component to inject CSS fixes for specific layout issues
 * This helps ensure proper footer positioning across all pages
 */
export const CustomStyles = () => {
  return (
    <style jsx global>{`
      /* Ensure proper footer positioning */
      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      
      /* Fix for project pages to prevent footer from showing in the middle */
      [data-path^="/projects/"] {
        min-height: auto !important;
        margin-bottom: 3rem;
      }

      /* Main content area should flex-grow */
      main, section, article {
        flex: 1;
      }

      /* Footer should stay at bottom */
      footer {
        margin-top: auto;
      }

      /* Fix for short content pages */
      .short-page {
        min-height: 70vh;
      }
    `}</style>
  );
}; 