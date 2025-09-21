import os;
import shutil;
from PIL import Image;

exceptionsFoldersCraftpixNormal = ["PSD", "__MACOSX"]
exceptionsExtensionsCraftpixNormal = [".pdf", ".png", ".txt", ".url"]

def CreateAssets(pathOrigin, pathDestination, mode="CraftpixNormal"):
    if mode == "CraftpixNormal":
        #print("Creating assets for CraftpixNormal mode")
        if (os.path.isdir(pathDestination) == True):
            shutil.rmtree(pathDestination)
        shutil.copytree(pathOrigin, pathDestination)
        for item in os.listdir(pathDestination):
            pathFolder = pathDestination + "/" + item
            if item in exceptionsFoldersCraftpixNormal:
                shutil.rmtree(pathFolder)
                continue
            if item.endswith(tuple(exceptionsExtensionsCraftpixNormal)):
                os.remove(pathFolder)
    else:
        print("Mode not recognized(reconhecido):", mode)

def CreateMultAssents(pathFolderOrigin, pathFolderDestination, mode="CraftpixNormal"):
    printProcess = False
    if mode != "CraftpixNormal":
        return

    for folderPackage in os.listdir(pathFolderOrigin): # Background, Sprites
        pathOriginPackage = pathFolderOrigin + folderPackage
        pathDestinationPackage = pathFolderDestination + folderPackage

        if printProcess == True:
            print("folderPackage:", folderPackage)
            print("pathOriginPackage:", pathOriginPackage)
            print("pathDestinationPackage:", pathDestinationPackage)

        for folderAssets in os.listdir(pathOriginPackage): # briga de rua_gangster, gorgona
            pathOriginAssets = pathOriginPackage + "/" + folderAssets
            pathDestinationAssets = pathDestinationPackage + "/" + folderAssets

            if printProcess == True:
                print("\nfolderAssets:", folderAssets)
                print("pathOriginAssets:", pathOriginAssets)
                print("pathDestinationAssets:", pathDestinationAssets)

            CreateAssets(pathOriginAssets, pathDestinationAssets, mode)


def CreateSubImgs(pathOrigin, pathDestination):
    if (os.path.isdir(pathDestination + "/SubImgs") == False):
        os.mkdir(pathDestination + "/SubImgs")
    PathSubImgs = pathDestination + "/SubImgs/"
    #print("PathSubImgs:", PathSubImgs)

    for folder in os.listdir(pathOrigin): #Knight_1, Knight_2
        if folder == "SubImgs": continue
        if (os.path.isdir(PathSubImgs + folder) == False):
            os.mkdir(PathSubImgs + folder)

        PathFolder = pathOrigin + "/" + folder + "/"
        PathSubFolder = PathSubImgs + folder + "/"
        #print("\nPathSubFolder:", PathSubFolder)
        for imgPath in os.listdir(PathFolder): #attack_1.png, attack_2.png
            #print("imgPath: ", imgPath)
            img = Image.open(PathFolder + imgPath)
            frames = img.size[0] / img.size[1]
            if (frames.is_integer() == False):
                print("Error: frames is not integer", imgPath, frames)
                print("PathFolder + imgPath:", PathFolder + imgPath)
                continue
            for i in range(int(frames)):
                imgCrop = img.crop((i * img.size[1], 0, (i + 1) * img.size[1], img.size[1])) #left, upper, right, lower
                #print("PathSubFolder + imgPath.replace('.png', f'_{i + 1}.png'):", PathSubFolder + imgPath.replace(".png", f"_{i + 1}.png"))
                imgCrop.save(PathSubFolder + imgPath.replace(".png", f"_{i + 1}.png"))
        
def CreateMultAssentsAndSubImgs(pathFolderOrigin, pathFolderDestination, mode="CraftpixNormal"):
    CreateMultAssents(pathFolderOrigin, pathFolderDestination, mode)

    for folderPackage in os.listdir(pathFolderDestination): # Background, Sprites
        pathDestinationPackage = pathFolderDestination + folderPackage

        for folderAssets in os.listdir(pathDestinationPackage): # briga de rua_gangster, gorgona
            pathDestinationAssets = pathDestinationPackage + "/" + folderAssets
            CreateSubImgs(pathDestinationAssets, pathDestinationAssets)

CreateMultAssentsAndSubImgs("C:/Users/lucas/Desktop/SworldOfWar/src/BaseAssets/", "C:/Users/lucas/Desktop/SworldOfWar/dist/Assets/", "CraftpixNormal")

# CreateMultAssents("C:/Users/lucas/Desktop/SworldOfWar/src/BaseAssets/", "C:/Users/lucas/Desktop/SworldOfWar/dist/Assets/", "CraftpixNormal")
# CreateSubImgs("C:/Users/lucas/Desktop/SworldOfWar/dist/Assets/Sprites/briga de rua_gangster", "C:/Users/lucas/Desktop/SworldOfWar/dist/Assets/Sprites/briga de rua_gangster")