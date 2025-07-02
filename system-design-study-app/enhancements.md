# Planned Enhancements & TODOs

This document outlines planned enhancements, unimplemented features, and areas for improvement identified within the System Design Study App codebase.

## I. Core Functionality & Content

1.  **AI Feedback System (`functions/src/index.ts`)**
    *   **TODO**: Configure a real LLM provider (e.g., Vertex AI Gemini). Currently, AI feedback is mocked.
    *   **Details**: This involves setting up the LLM SDK, managing API keys/credentials, and replacing the mock logic with actual API calls to the LLM.

2.  **Interactive Decision Trees (Various `data/*AppData.js` files)**
    *   **Placeholder**: Several topics have placeholders for interactive decision trees:
        *   API Design: "API Protocol/Style Chooser"
        *   Databases: "Database Decision Tree"
        *   Load Balancing: "Load Balancer Selection Helper"
        *   Messaging Queues: "Messaging Queue Decision Tree"
        *   Scalability Concepts: "Scalability Strategy Helper"
    *   **Details**: These components need to be designed and implemented to guide users through selection processes.

3.  **Glossary Tooltip (`components/common/GlossaryTooltip.jsx`)**
    *   **TODO**: Implement full functionality. Currently a placeholder.
    *   **Details**: Needs text parsing for `{{Term}}` patterns, dynamic tooltip display logic, fetching/linking definitions from `glossaryData.js`, and styling. The `RenderTextWithLinks` utility already handles some of this linking, so `GlossaryTooltip` might need to be re-evaluated or integrated with it.

4.  **Additional Diagrams & Visualizations**
    *   **Cache Invalidation Flowchart (`components/caches/PatternsView.jsx`)**: TODO for a flowchart diagram.
    *   **Circuit Breaker Diagram (`components/caches/PatternsView.jsx`)**: TODO for a diagram.
    *   **Push vs. Pull Models Diagram (`components/messaging_queues/ScalabilityModuleMQ.jsx`)**: TODO for a diagram.
    *   **Document DB Data Model (`components/databases/SectionDocumentDB.jsx`)**: Placeholder for a richer visual representation than current `<pre>` block. Consider a JSON viewer component or styled divs.
    *   **SQL DB Data Model (`components/databases/SectionSqlDB.jsx`)**: Placeholder for a more visual representation of relational tables and foreign key relationships.

5.  **Networking & CDN Content (`data/networkingCDNAppData.js`)**
    *   **Placeholder Comment**: File starts with `// Placeholder for Networking & CDN App Data`.
    *   **Details**: While content exists, it might be incomplete or require further review and expansion.

## II. UI & Component Improvements

1.  **Modal Close Icon (`components/common/Modal.jsx`)**
    *   **Placeholder**: The modal close button uses a text "X" instead of the intended `Icon` component.
    *   **Details**: Uncomment and use the `<Icon name="close" ... />` component.

## III. Testing

1.  **Mobile Navigation Test (`components/Layout.test.jsx`)**
    *   **TODO**: Add a test for mobile navigation.
    *   **Details**: This requires mocking `useMediaQuery` or a similar approach to simulate mobile viewports.

## IV. Code & Data Structure Considerations

1.  **Topic & Subtopic Management (`pages/AllTopicsPage.jsx`)**
    *   **Observation**: The logic for generating subtopic lists is currently hardcoded within `AllTopicsPage.jsx` by iterating through specific keys in imported `appData` objects.
    *   **Potential Enhancement**: Consider a more data-driven or centralized approach for defining topics and their hierarchical structure. This could simplify `AllTopicsPage.jsx` and make it easier to manage content organization. For example, each `appData` file could export a list of its navigable sections/subtopics, or a central manifest file could define the overall topic structure.

## V. Review of User Concerns (Visual Components)

*   **Initial Concern**: User reported "multiple mermaid diagrams and flowcharts and visual components implemented but i am seeing multiple errors or warnings in logs and few of them aren't rendered properly."
*   **Analysis**:
    *   Log warnings/errors were primarily from test environments (intentional error tests, React Router warnings now addressed, Firebase init logs) and did not indicate broken visual components in the app itself.
    *   The `MermaidDiagram` component is functional.
    *   The `CachepediaView` (using `react-chartjs-2`) is functional.
    *   Other "missing" visuals are explicitly marked as `TODO`s (see section I.4 above).
*   **Conclusion**: The main issue regarding visual components appears to be planned but not-yet-implemented items, rather than existing ones being fundamentally broken. The previously noisy test logs might have contributed to a perception of wider issues.

This list should serve as a good starting point for future development and refinement of the application.
