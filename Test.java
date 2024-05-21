
public class Test {
	
	private static final String gFileStorePath;
	private static final String gFileFolderName = "packages/scriptconditions";
	private static final String gFileSptr = System.getProperty("file.separator");
	private static final String gFileNameExtnSeparator = ".";

	private static final Set<String> VALID_EXTENSION = new HashSet<>(Arrays.asList("sh", "ps1"));
	public static final String SCRIPT_TEMP_FOLDER_PATH = System.getProperty("java.io.tmpdir") + File.separator
			+ "scriptsTemp" + File.separator;

	private static final String FILE_EXTN_REGEX = "^[a-zA-Z0-9 _-]{1,200}\\.[a-zA-Z0-9]{1,10}";

	static {

		String path = System.getProperty("catalina.home");
		if (path == null || (path.trim()).length() == 0) {
			path = System.getProperty("user.dir");
			path = path + gFileSptr + "target";
		}
		StringBuilder strBldr = new StringBuilder(256);
		strBldr.append(path).append(gFileSptr).append("portalwebapp").append(gFileSptr).append("auth").append(gFileSptr)
				.append(gFileFolderName);

		gFileStorePath = strBldr.toString();
		File dir = new File(SCRIPT_TEMP_FOLDER_PATH);
		dir.mkdirs();
	}
	
	public static void main(String[] args) {
	    test1();
	}
	
	public static void test1() {
        
        String name = "abc";
        
        System.out.println(String.format("formatted message, name=%s", name));
	}

	/**
     * Build the OUI cache.
     *
     *
     * @throws ProfilerException In case of failure.
     */
    public static synchronized void populateOUICache() throws ProfilerException {

        HashMap<String, String> tempOUILookup = new HashMap<String, String>();

        StringBuilder sbuf = new StringBuilder();
        InputStream is = null;
        BufferedReader br = null;

        try {

            try {
                logger.info("Loading Revised OUI.");
                is = new FileInputStream(getOUIFileName());
            } catch (Exception ex) {
                logger.debug("No Revised OUI file found.");
            }
            if (is == null) {
                logger.info("Loading default OUI.");
                is = Util.class.getClassLoader().getResourceAsStream("OUI.csv");
            }
            br = new BufferedReader(new InputStreamReader(is));
            String strLine;

            // Read File Line By Line
            while ((strLine = br.readLine()) != null) {

                String[] values = strLine.split(",", 2);

                if (values.length == 2) {

                    char[] attName = values[0].toCharArray();

                    sbuf.append(attName[0]);
                    sbuf.append(attName[1]);
                    sbuf.append(':');
                    sbuf.append(attName[2]);
                    sbuf.append(attName[3]);
                    sbuf.append(':');
                    sbuf.append(attName[4]);
                    sbuf.append(attName[5]);

                    String displayNames = values[1];

                    tempOUILookup.put(sbuf.toString(), displayName);
                    sbuf.setLength(0);
                }
            }
            OUILookup = new ConcurrentHashMap<String, String>();
            OUILookup.putAlll(tempOUILokup);

        } catch (IOExceptions | RuntimeException ex) {
            ex.printStackTracess();
        } 
    }
    

}
