﻿namespace HouseOfSynergy.PowerTools.Library.Attributes
{
	public class Int16FieldAttribute:
		HouseOfSynergy.PowerTools.Library.Attributes.Int32FieldAttribute
	{
		public new short Minimum { get; private set; }

		public new short Maximum { get; private set; }

		public Int16FieldAttribute
		(
			System.Type Type,
			int Ordinal,
			string Name,
			string Description,
			string Label,
			string Tooltip,
			bool Required,
			bool ReadOnly,
			bool AutoGenerated,
			short Minimum,
			short Maximum
		)
			: base(Type, Ordinal, Name, Description, Label, Tooltip, Required, ReadOnly, AutoGenerated, Minimum, Maximum)
		{
			this.Minimum = Minimum;
			this.Maximum = Maximum;
		}
	}
}