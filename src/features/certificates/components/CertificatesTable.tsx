import React from "react";
import Table from "@/components/common/Table";
import { Certificate } from "../types/certificate.types";
import { formatShortDate } from "@/utils/helpers";
import Button from "@/components/common/Button";
import { Download, Award } from "lucide-react";

interface CertificatesTableProps {
  certificates: Certificate[];
  onDownload?: (certificate: Certificate) => void;
}

interface CertificatesTableRow extends Certificate {
  onDownload?: (certificate: Certificate) => void;
}

const CertificatesTable = ({
  certificates,
  onDownload,
}: CertificatesTableProps) => {
  const getTypeBadge = (type: string) => {
    const typeConfig = {
      LEAVING: {
        label: "Leaving Certificate",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      BONAFIDE: {
        label: "Bonafide Certificate",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      CHARACTER: {
        label: "Character Certificate",
        className: "bg-purple-100 text-purple-800 border-purple-200",
      },
    };

    const config = typeConfig[type as keyof typeof typeConfig] || {
      label: type,
      className: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
      >
        <Award className="w-3.5 h-3.5 mr-1.5" />
        {config.label}
      </span>
    );
  };

  const certificateColumns = [
    {
      key: "student",
      header: "Student",
      render: (row: CertificatesTableRow) => {
        const student = typeof row.studentId === "object" ? row.studentId : null;
        return (
          <div>
            <span className="font-medium text-gray-900 block">{student?.name || "—"}</span>
            {student?.rollNumber && (
              <span className="text-xs text-gray-500">Roll: {student.rollNumber}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "type",
      header: "Type",
      render: (row: CertificatesTableRow) => getTypeBadge(row.type),
    },
    {
      key: "issuedOn",
      header: "Issued On",
      render: (row: CertificatesTableRow) => (
        <span className="text-sm text-gray-700">{formatShortDate(row.issuedOn)}</span>
      ),
    },
    {
      key: "issuedBy",
      header: "Issued By",
      render: (row: CertificatesTableRow) => {
        const issuer = typeof row.issuedBy === "object" ? row.issuedBy : null;
        return <span className="text-sm text-gray-700">{issuer?.name || issuer?.email || "—"}</span>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: CertificatesTableRow) => (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => row.onDownload?.(row)}
            startIcon={<Download className="h-4 w-4" />}
          >
            Download
          </Button>
        </div>
      ),
      width: "120px",
    },
  ];

  const tableData = certificates.map((certificate) => ({
    ...certificate,
    onDownload,
  }));

  return (
    <Table
      title="Certificates"
      data={tableData}
      columns={certificateColumns}
      selectable={false}
    />
  );
};

export default CertificatesTable;

