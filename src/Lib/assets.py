import os;
import shutil;
from PIL import Image;
from enum import Enum

pathPy = os.path.abspath(__file__).replace("\\", "/")
pathSrc = pathPy.replace("Lib/assets.py", "")
pathDist = pathPy.replace("src/Lib/assets.py", "dist/")

print("pathPy", pathPy)
print("pathSrc", pathSrc)
print("pathDist", pathDist)

class ModeExtract(Enum):
    CraftpixNormal = 1

exceptionsFoldersCraftpixNormal = ["PSD", "__MACOSX"]
# exceptionsExtensionsCraftpixNormal = [".pdf", ".png", ".txt", ".url"]

def extractAssetsWithFolderAssetsCraftpixNormal(sourcePath: str, destinationPath: str, scaleY = 1): # Use Gangsters_1 For Attack_1.png
    for item in os.listdir(sourcePath): # items: Attack_1.png, Attack_2.png, / Exclusao de: .pdf, .txt etc
        if os.path.isdir(os.path.join(sourcePath, item)):
            print("Dir found where not expected:", item)
            print("Path:", os.path.join(sourcePath, item))
            continue
        else:
            img = Image.open(os.path.join(sourcePath, item))
            animations = img.width / img.height * scaleY
            if animations % 1 != 0:
                print("Warning: unexpected image dimensions for sprite sheet:", item)
                print("Width:", img.width, "Height:", img.height, "Animations (width/height):", animations)
            animations = int(animations)
            for i in range(animations):
                box = (i * img.height, 0, (i + 1) * img.height, img.height)
                imgCrop = img.crop(box)
                imgCrop.save(os.path.join(destinationPath, f"{item.replace('.png', '')}_{i+1}.png"))
    

def extractAssetsWithPackageFolderAssetsCraftpixNormal(sourcePath: str, destinationPath: str): # Use briga de rua_gangster For Gangsters_1
    for folder in os.listdir(sourcePath): # items: Gangsters_1, Gangsters_2, / Exclusao de: PSD, __MACOSX etc
        if os.path.isdir(os.path.join(sourcePath, folder)):
            if folder in exceptionsFoldersCraftpixNormal:
                continue
            itemSourcePath = os.path.join(sourcePath, folder)
            itemDestinationPath = os.path.join(destinationPath, folder)
            if not os.path.exists(itemDestinationPath):
                os.makedirs(itemDestinationPath)
            for item in os.listdir(itemSourcePath):
                if os.path.isdir(os.path.join(itemSourcePath, item)) and item not in exceptionsFoldersCraftpixNormal:
                    extractAssetsWithFolderAssetsCraftpixNormal(itemSourcePath, itemDestinationPath)
        else:
            continue

def extractAssetsWithPackageFolderAssets(sourcePath: str, destinationPath: str, mode: ModeExtract): # Use briga de rua_gangster For Gangsters_1
    if mode == ModeExtract.CraftpixNormal:
        extractAssetsWithPackageFolderAssetsCraftpixNormal(sourcePath, destinationPath)



# def extractAssetsWithFolderAssets(sourcePath: str, destinationPath: str, mode: ModeExtract): # Sprites etc
#     if not os.path.exists(sourcePath):
#         print("Source path does not exist:", sourcePath)
#         return
#     if not os.path.exists(destinationPath):
#         os.makedirs(destinationPath) # create destination folder if not exists: briga de rua_gangster, guerreiro medieval
    
#     if mode == ModeExtract.CraftpixNormal:
#         extractAssetsWithFolderAssetsCraftpixNormal(sourcePath, destinationPath)

extractAssetsWithPackageFolderAssets(os.path.join(pathSrc, "BaseAssets/Sprites"), os.path.join(pathDist, "Assets/Sprites"), ModeExtract.CraftpixNormal)
# extractAssetsWithFolderAssetsCraftpixNormal(os.path.join(pathSrc, "BaseAssets/Sprites/briga de rua_gangster/Gangsters_1"), os.path.join(pathDist, "Assets/Sprites/briga de rua_gangster/Gangsters_1"), 1)