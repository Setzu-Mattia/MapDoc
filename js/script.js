/** Style **/
var white = "#FFFFFF";
var grey = "#333333";

var border0 = "#3B8183";
var border1 = "#ED303C";
var border2 = "#FAD089";
var background0 = "#3B8183";
var background1 = "#ED303C";
var background2 = "#FAD089";
var highlightBorder0 = border0;
var highlightBorder1 = border1;
var highlightBorder2 = border2;
var hightlightBackground0 = white;
var hightlightBackground1 = white;
var hightlightBackground2 = white;
var fontColor0 = white;
var fontColor1 = white;
var fontColor2 = white;
var radius0 = 3;
var radius1 = 3;
var radius2 = 3;

/** Scaling **/
var scale = 0.2;

/** Physics **/
var gForce = 0.7;

// Set-up
var maps = [];
var networkNodes = new vis.DataSet();
var networkEdges = new vis.DataSet();
var data = {nodes: networkNodes,
           edges: networkEdges};
var options = {
    hover: true,
    groups: {
        interface: {
            color: {
                border: border0,
                background: background0,
                highlight: {
                    background: background0,
                    border: highlightBorder0,
                }
            },
            fontColor: white
        },
        type: {
            color: {
                border: border1,
                background: background1,
                highlight: {
                    background: background1,
                    border: highlightBorder1,
                }
            },
            fontColor: white,
        },
        annotation: {
          color: {
                border: border2,
                background: background2,
                highlight: {
                    background: background2,
                    border: highlightBorder2,
                }
            },
            fontColor: white,
        }
    },
    mass: gForce
}

// Basic code infos mock
var docMap = new Map();
var namesTable = new Map();

/*
var network = new vis.Network(container(), data, options);


networkNodes.add([{id: 0, label: "Interface", group: "interface"},
             {id: 1, label: "Interface", group: "interface"},
             {id: 2, label: "Type", group: "type"},
             {id: 3, label: "Annotation", group: "annotation"}]);
networkEdges.add([{id: "0-1", from: 0, to: 1},
         {id: "2-1", from: 2, to: 1}]);

namesTable.set(0, "Interface 0");
namesTable.set(1, "Interface 1!");
namesTable.set(2, "Type 2");
namesTable.set(3, "Annotation 3!");
/*

/*
namesTable.set(0, "App");
namesTable.set(1,"Army");
namesTable.set(2,"Castle");
namesTable.set(3,"ElfArmy");
namesTable.set(4,"ElfCastle");
namesTable.set(5,"ElfKingdomFactory");
namesTable.set(6,"ElfKing");
namesTable.set(7,"KingdomFactory");
namesTable.set(8,"King");
namesTable.set(9,"OrcArmy");
namesTable.set(10,"OrcCastle");
namesTable.set(11,"OrcKingdomFactory");
                  
docMap.set(0, "The essence of the Abstract Factory pattern is a factory interface (KingdomFactory) and its implementations (ElfKingdomFactory, OrcKingdomFactory). The example uses both concrete implementations to create a king, a castle and an army.");
docMap.set(5, "Concrete factory.");
docMap.set(7, "The factory interface.");

// Abstract factory
networkNodes.add([{id: 0, label: "App", group: "type"},
                  {id: 1, label: "Army", group: "interface"},
                  {id: 2, label: "Castle", group: "interface"},
                  {id: 3, label: "ElfArmy", group: "type"},
                  {id: 4, label: "ElfCastle", group: "type"},
                  {id: 5, label: "ElfKingdomFactory", group: "type"},
                  {id: 6, label: "ElfKing", group: "type"},
                  {id: 7, label: "KingdomFactory", group: "interface"},
                  {id: 8, label: "King", group: "interface"},
                  {id: 9, label: "OrcArmy", group: "type"},
                  {id: 10, label: "OrcCastle", group: "type"},
                  {id: 11, label: "OrcKingdomFactory", group: "type"},
                  {id: 12, label: "OrcKing", group: "type"}]);

networkEdges.add([{id: "3-1", from: 3, to: 1},
                  {id: "9-1", from: 9, to: 1},
                  {id: "4-2", from: 4, to: 2},
                  {id: "10-2", from: 10, to: 2},
                  {id: "6-8", from: 6, to: 8},
                  {id: "12-8", from: 12, to: 8},
                  {id: "5-7", from: 5, to: 7},
                  {id: "11-7", from: 11, to: 7}]);
*/

/*
networkNodes.add([{id: 0, label: "App", group: "type"},
                {id: 1, label: "Engineer", group: "interface"},
                {id: 2, label: "GnomeEngineeringManager", group: "type"},
                {id: 3, label: "GnomeEngineer", group: "type"},
                {id: 4, label: "GoblinGlider", group: "type"}]);
networkEdges.add([{id: "2-1", from: 2, to: 1},
                  {id: "3-1", from: 3, to: 1},
                  {id: "4-2", from: 4, to: 2}]);

namesTable.set(0, "App");
namesTable.set(1, "Engineer");
namesTable.set(2, "GnomeEngineeringManager");
namesTable.set(3, "GnomeEngineer");
namesTable.set(4, "GoblinGlider");

docMap.set(0, "There are two variations of the Adapter pattern: The class adapter implements the adaptee's interface whereas the object adapter uses composition to contain the adaptee in the adapter object. This example uses the object adapter approach. The Adapter (GnomeEngineer) converts the interface of the target class (GoblinGlider) into a suitable one expected by the client (GnomeEngineeringManager).");
docMap.set(1, "Engineers can operate devices.");
docMap.set(2, "GnomeEngineering manager uses Engineer to operate devices.");
docMap.set(3, "Adapter class. Adapts the interface of the device (GoblinGlider) into Engineer interface expected by the client (GnomeEngineeringManager).");
docMap.set(4, "Device class (adaptee in the pattern).");
*/

/*
namesTable.set(0, "App");
namesTable.set(1, "BlindingMagicWeaponImp");
namesTable.set(2, "BlindingMagicWeapon");
namesTable.set(3, "Excalibur");
namesTable.set(4, "FlyingMagicWeaponImp");
namesTable.set(5, "FlyingMagicWeapon");
namesTable.set(6, "MagicWeaponImp");
namesTable.set(7, "MagicWeapon");
namesTable.set(8, "Mjollnir");
namesTable.set(9, "SoulEatingMagicWeaponImp");
namesTable.set(10, "SoulEatingMagicWeapon");
namesTable.set(11, "Stormbringer");

networkNodes.add([{id: 0, label: "App", group: "type"},
                {id: 1, label: "BlindingMagicWeaponImp", group: "type"},
                {id: 2, label: "BlindingMagicWeapon", group: "interface"},
                {id: 3, label: "Excalibur", group: "type"},
                {id: 4, label: "FlyingMagicWeaponImp", group: "type"},
                {id: 5, label: "FlyingMagicWeapon", group: "interface"},
                {id: 6, label: "MagicWeaponImp", group: "type"},
                {id: 7, label: "MagicWeapon", group: "interface"},
                {id: 8, label: "Mjollnir", group: "type"},
                {id: 9, label: "SoulEatingMagicWeaponImp", group: "type"},
                {id: 10, label: "SoulEatingMagicWeapon", group: "interface"},
                {id: 11, label: "StormBringer", group: "type"}]);
networkEdges.add([{id: "2-1", from: 2, to: 1},
                  {id: "3-2", from: 3, to: 2},
                  {id: "3-7", from: 3, to: 7},
                  {id: "4-5", from: 4, to: 5},
                  {id: "8-6", from: 8, to: 6},
                  {id: "6-7", from: 6, to:7},
                  {id: "11-9", from: 6, to: 9},]);

docMap.set(0,"In Bridge pattern both abstraction (MagicWeapon) and implementation (MagicWeaponImp) have their own class hierarchies. The interface of the implementations can be changed without affecting the clients.");
docMap.set(6,"Implementation interface.");
docMap.set(7, "Abstraction interface");
*/

namesTable.set(0, "GHobbits");
namesTable.set(1, "GOrcs");
namesTable.set(2, "GWeather");
namesTable.set(3, "Observable");
namesTable.set(4, "Observer");
namesTable.set(5, "Race");

networkNodes.add([{id: 0, label: "GHobbits", group: "type"},
                  {id: 1, label: "GOrcs", group: "type"},
                  {id: 2, label: "GWeather", group: "type"},
                  {id: 3, label: "Observable", group: "type"},
                  {id: 4, label: "Observer", group: "type"},
                  {id: 5, label: "Race", group: "interface"}]);

networkEdges.add([{id: "0-5", from: 0, to: 5},
                  {id: "1-5", from: 1, to: 5},
                  {id: "2-3", from: 2, to: 3},
                  {id: "3-4", from: 3, to: 4},
                  {id: "5-4", from: 5, to: 4}]);

docMap.set(3, "Generic observer inspired by Java Generics and Collection by Naftalin & Wadler @param <S> Subject @param <O> Observer @param <A> Argument type");

data = {nodes: networkNodes,
       edges: networkEdges};

var network = new vis.Network(container(), data, options);