# dicepath
An RPG-system agnostic online character sheet with bot integrations.

## How does this work?
A dicepath character sheet is comprised of three main elements. Using these three things together, my hope is that anything can be recreated in any RPG system. But at least everything in the D&D style ones (U've obvously not played every RPG system out there.)

### Stats
These are the numbers that GMs and players usually care about the most. This will be things like HP, Armor Class, money, experience, etc. But it's not limited to just plain numbers. Things like conditions are also stats.

### Frobs
These are controlable widgets that you see on screen. Buttons, slots for armor and spells, etc. These give players the ability to interact with their character sheet and are often the starting point for a modifier's logic. These will also be what gets mapped to your character's API that is exposed to dice bots.

### Modifiers
Modifiers are the things that modify the stats using a complex system called *math*. They can reference stats and frobs in their equations. They can also be paired with pieces of logic that can turn a modifier on and off.

## Examples
Just some examples / ideas to get the point across and to help me remember them.

* An Attacked1, Attacked2, Attacked3 modifiers that lower your to-hit bonus in PF2e.
* A frob to increase the round, which lowers the duration on various conditions.
* A frob to enable/disable a Barbarian's rage.
* A frob for your prepared spells.

## Notes

* Tabs and the general outlay are saved in the character DB. Players can customize their sheet if desired.
* GMs can build their own sheets that contain valuable at-a-glance info for all other sheets they have access to.
* New characters are created from templates, which contain RPG-system specific things like how defense is calculated.