import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import AdminLayout from '@/components/admin/AdminLayout';
import { SITE_NAME } from '@/lib/constants';

interface Resident {
  id: number;
  fullName: string | null;
  email: string;
  phone: string | null;
  postcode: string;
  message: string | null;
  serviceInterest: string | null;
  createdAt: string;
}

interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  postcode: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("submissions");

  // Get form submissions
  const { data: submissions, isLoading: submissionsLoading } = useQuery<{ data: Resident[] }>({
    queryKey: ['/api/admin/submissions']
  });

  // Get contact form submissions
  const { data: contacts, isLoading: contactsLoading } = useQuery<{ data: ContactSubmission[] }>({
    queryKey: ['/api/admin/contacts']
  });

  return (
    <AdminLayout title="Dashboard">
      <Helmet>
        <title>Admin Dashboard | {SITE_NAME}</title>
      </Helmet>
      
      <Tabs 
        defaultValue="submissions" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          <TabsTrigger value="contacts">Contact Inquiries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Service Request Submissions</CardTitle>
              <CardDescription>
                View all service requests submitted through the multi-step form
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionsLoading ? (
                <div className="flex justify-center py-8">Loading submissions...</div>
              ) : submissions?.data?.length ? (
                <Table>
                  <TableCaption>List of all service request submissions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Postcode</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.data.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.id}</TableCell>
                        <TableCell>{submission.fullName || "N/A"}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.phone || "N/A"}</TableCell>
                        <TableCell>{submission.postcode}</TableCell>
                        <TableCell>{submission.serviceInterest || "General"}</TableCell>
                        <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">No submissions found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Inquiries</CardTitle>
              <CardDescription>
                View all inquiries submitted through the contact form
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contactsLoading ? (
                <div className="flex justify-center py-8">Loading contact submissions...</div>
              ) : contacts?.data?.length ? (
                <Table>
                  <TableCaption>List of all contact form submissions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Postcode</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.data.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.id}</TableCell>
                        <TableCell>{contact.fullName}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone || "N/A"}</TableCell>
                        <TableCell>{contact.postcode}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                        <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">No contact submissions found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}