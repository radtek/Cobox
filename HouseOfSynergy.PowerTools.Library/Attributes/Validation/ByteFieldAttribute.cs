﻿namespace HouseOfSynergy.PowerTools.Library.Attributes
{
	public class ByteFieldAttribute:
		HouseOfSynergy.PowerTools.Library.Attributes.Int16FieldAttribute
	{
		public new byte Minimum { get; private set; }

		public new byte Maximum { get; private set; }

		public ByteFieldAttribute
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
			byte Minimum,
			byte Maximum
		)
			: base(Type, Ordinal, Name, Description, Label, Tooltip, Required, ReadOnly, AutoGenerated, Minimum, Maximum)
		{
			this.Minimum = Minimum;
			this.Maximum = Maximum;
		}
	}
}