# A little script to import new roms
# on bootup.

import os
import shutil


# Do the moving of roms from source to dest
def copy_roms(src, dest):
    dirs = os.listdir(src)
    num_copied = 0
    if (len(dirs)):
        for dir in dirs:
            files = os.listdir(src + '/' + dir)
            for file in files:
                num_copied += 1
                shutil.move(src + '/' + dir + '/' + file,
                            dest + '/' + dir + '/')

        print "Finished copying " + num_copied + " new ROMs."

    else:
        print "Unable to find ROM directories in source."

if __name__ == "__main__":

    # I'm copying from the FAT32 partition of my SD card
    new_roms = "/boot/roms"

    # And I'm using RetroPie
    saved_roms = "/home/pi/RetroPie/roms"

    # Copy stuff.
    copy_roms(new_roms, saved_roms)
