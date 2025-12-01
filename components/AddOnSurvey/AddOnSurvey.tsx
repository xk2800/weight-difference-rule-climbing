'use client';

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// 1. Import your new updates data
import updatesData from '@/data/updates.json';

// 2. (Optional but recommended) Define a type for your update object
interface Update {
  version: string;
  date: string;
  changes: string[];
}

interface AddOnSurveyProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSurvey: () => void;
  version?: string; // This prop can now override which version is shown
}

export function AddOnSurvey({ isOpen, onClose, version, onOpenSurvey }: AddOnSurveyProps) {
  // 3. Find the update to show
  // If a 'version' prop is passed, find that version.
  // Otherwise, default to the *latest* version (the first item in the array).
  const updateToShow: Update | undefined = version
    ? (updatesData as Update[]).find((u) => u.version === version)
    : (updatesData[0] as Update);

  // If no update is found (e.g., empty JSON or bad version prop), don't render
  if (!updateToShow) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* 4. Use the version from your JSON data */}
          <DialogTitle>HATE crowds in the gym?</DialogTitle>
          {/* <DialogDescription>
            We&#39;ve released some exciting new features and improvements. Here&#39;s a quick rundown.
          </DialogDescription> */}
        </DialogHeader>
        <div className="py-4">
          <p>Im working on a project to build a <strong>Live Crowd Tracker</strong> for the gym so you&#39;ll be able to check if its busy before getting there</p>
          <br />
          <p className='text-center'>I need to know if you&#39;d use it</p>
          <br />
          <p className='text-center'>Quick survey 👇🏻</p>
        </div>
        <DialogFooter>
          <Button onClick={onOpenSurvey} className='w-full'>FIND QUIET TIMES!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}