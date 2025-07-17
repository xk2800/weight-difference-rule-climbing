'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateModal({ isOpen, onClose }: UpdateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>🚀 What&#39;s New?</DialogTitle>
          <DialogDescription>
            We&#39;ve released some exciting new features and improvements. Here&#39;s a quick rundown.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Add your update details here */}
          <ul className="list-disc space-y-2 pl-5">
            <li>New feature: Dark Mode!</li>
            <li>Improved performance across the board.</li>
            <li>Fixed a bug with the contact form.</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Got It!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}