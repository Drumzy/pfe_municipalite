export const typeData = [
    {value: 'Vidange', label: 'Vidange'},
    {value: 'Controle Technique', label: 'Controle Technique'},
    {value: 'Pneumatique', label:'Pneumatique'}
];

export const periodiciteData = [
    {value: 'Mensuelle', label: 'Mensuelle '},
    {value: 'Trimestrielle ', label:'Trimestrielle'},
    {value: 'Semestrielle ', label:'Semestrielle '},
    {value: 'Annuelle', label:'Annuelle'},
]

export const mechanicData: Array<{
    key: string;
    label: string;
    value: string;
    disabled: boolean;
}> = [
    {key: '', label: '', value:'', disabled: true},
];

export const headers = (
    <tr>
        <th>Réference Plan</th>
        <th>Type</th>
        <th>N° repetition</th>
        <th>Actions</th>
    </tr>
)