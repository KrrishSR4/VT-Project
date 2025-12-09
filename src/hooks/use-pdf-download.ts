import { jsPDF } from "jspdf";

export const usePdfDownload = () => {
  const downloadAsPdf = (content: string, title: string, topic: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    
    // Clean content - remove markdown symbols
    const cleanContent = content
      .replace(/#{1,6}\s*/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/---/g, '')
      .replace(/\n{3,}/g, '\n\n');

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, 25);
    
    // Topic
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(topic, margin, 35);
    
    // Content
    doc.setFontSize(11);
    doc.setTextColor(40);
    
    const lines = doc.splitTextToSize(cleanContent, maxWidth);
    let y = 50;
    const lineHeight = 6;
    const pageHeight = doc.internal.pageSize.getHeight();
    
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    // Save
    const fileName = `${topic.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase()}.pdf`;
    doc.save(fileName);
  };

  return { downloadAsPdf };
};
